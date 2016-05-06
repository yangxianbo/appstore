#coding:utf-8
#通用类
import os, sys, commands, re, time, json
from django.shortcuts import render_to_response, get_object_or_404, render
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.core import serializers
from django.template import RequestContext, loader, Context
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.http import HttpResponse
from django.contrib import admin
from account.decorator import login_required
from django.http import Http404
from django.db.models import Q
#tools
from tools.utils import get_datatables_records,UnixTime,time_change_stime,timestamp,stime_change_time,getip
from tools.handle_upfile import Handle_upfile
from tools.resolve_apk import readxml
#models
from store.models import *

def get_app_class(request):
    if request.method == 'POST':
        get_dict=appclass.objects.all().values()
        return_list=[]
        for class_info in get_dict:
            perinfo={'id':class_info['classid'],'name':class_info['classname']}
            return_list.append(perinfo)
        return HttpResponse(json.dumps(return_list ,indent=4,ensure_ascii=False), 'application/javascript')

def get_app_base(request):
    if request.method == 'POST':
        classid=request.POST['id']
        get_dict=appclassinfo.objects.filter(classid=classid).order_by('-pk').values()
        return_list=[]
        for app_base in get_dict:
            perinfo={'id':app_base['appid'],'name':app_base['appname'],'pkg':app_base['appfolder'],'LogoUrl':app_base['applogo'],'Search':app_base['appsearch']}
            return_list.append(perinfo)
        return HttpResponse(json.dumps(return_list ,indent=4,ensure_ascii=False), 'application/javascript')

def get_app_info(request):
    if request.method == 'POST':
        appid=request.POST['id']
        get_dict=appinfo.objects.filter(appid=appid).values()
        app_info=get_dict[0]
        perinfo={'id':app_info['appid'],'ctime':app_info['uptime'],'detail':app_info['appdesc'],'ver':app_info['version'],'DownUrl':app_info['downloadurl'],'Size':app_info['appsize'],'level':app_info['level'],'PicUrl':app_info['mainpic'],'pkg':app_info['appfolder']}
        return HttpResponse(json.dumps(perinfo ,indent=4,ensure_ascii=False), 'application/javascript')

def search_app(request):
    if request.method == 'POST':
        skey=request.POST['key']
        return_list=[]
        if skey != "":
            get_dict=appclassinfo.objects.filter(appsearch__contains=skey.lower()).order_by('-pk').values()
            for app_base in get_dict:
                perinfo={'id':app_base['appid'],'name':app_base['appname'],'pkg':app_base['appfolder'],'LogoUrl':app_base['applogo'],'Search':app_base['appsearch']}
                return_list.append(perinfo)
            return HttpResponse(json.dumps(return_list ,indent=4,ensure_ascii=False), 'application/javascript')
        else:return HttpResponse(json.dumps(return_list ,indent=4,ensure_ascii=False), 'application/javascript')

@login_required()
def store_index(request, template_name):
    if request.method == 'GET':
        _cid = request.REQUEST.get('classid', "0")
        if _cid != "0":
            queryset=appclassinfo.objects.filter(classid=_cid).order_by('-pk')
        else:
            queryset=appclassinfo.objects.all().order_by('-pk')

    elif request.method == 'POST':
        classid=request.POST["classid"]
        appid=request.POST["appid"]
        appname=request.POST["appname"]
        appsearch=request.POST["appsearch"]
        appdesc=request.POST["appdesc"]
        level=request.POST["level"]
        if request.POST['action'] == 'add':
            try:
                app_base=appclassinfo.objects.create(classid=classid,appid=appid,appname=appname,appsearch=appsearch)
                app_base.save()
                app_info=appinfo.objects.create(appid=appid,appdesc=appdesc,level=level)
                app_info.save()
                return HttpResponse('ok')
            except Exception as error:
                return HttpResponse(str(error))
        else:
            try:
                upappbase=appclassinfo.objects.filter(appid=appid)
                upappinfo=appinfo.objects.filter(appid=appid)
                upappbase.update(classid=classid,appid=appid,appname=appname,appsearch=appsearch)
                upappinfo.update(appdesc=appdesc,level=level)
                return HttpResponse('ok')
            except Exception as error:
                return HttpResponse(str(error))

    classinfo=appclass.objects.all()
    search_fields = ['appid','appfolder','appname','appsearch']
    return get_datatables_records(
        request,
        queryset,
        search_fields,
        template_name,
        extra_context={
            'classinfo':classinfo
        })

@login_required()
def show_md_data(request):
    appid=request.POST['pk']
    c_data=appclassinfo.objects.get(appid=appid)
    a_data=appinfo.objects.get(appid=appid)
    data=[{'fields':{'appid':c_data.appid,'appfolder':c_data.appfolder,'classid':c_data.classid,'appname':c_data.appname,'applogo':c_data.applogo,'appsearch':c_data.appsearch,'uptime':a_data.uptime,'appdesc':a_data.appdesc,'version':a_data.version,'downloadurl':a_data.downloadurl,'appsize':a_data.appsize,'level':a_data.level,'mainpic':a_data.mainpic}}]
    return HttpResponse(json.dumps(data), 'application/javascript')

@login_required()
def up_file(request):
    localtime=UnixTime()
    f=request.FILES['upfile']
    opera=request.POST['flag']
    appid=request.POST['appid']
    prefix=os.path.splitext(f.name)[-1]
    if prefix == ".apk" and opera == "upapp":
        upstate=Handle_upfile(f)
        if upstate != -1 and upstate != -2:
            apk_info=readxml(upstate)
        apkurl="http://appstoreapi.tvdfe.com:8090/%s"%os.path.basename(upstate)
        appinfo.objects.filter(appid=appid).update(appfolder=apk_info[0],uptime=localtime,version=apk_info[1],appsize=apk_info[2],downloadurl=apkurl)
        appclassinfo.objects.filter(appid=appid).update(appfolder=apk_info[0])
        return HttpResponse('ok')
    elif (prefix == ".png" or prefix == ".jpg") and opera == "uplogo":
        upstate=Handle_upfile(f)
        if upstate != -1 and upstate != -2:
            logourl="http://appstoreapi.tvdfe.com:8090/%s"%os.path.basename(upstate)
            appclassinfo.objects.filter(appid=appid).update(applogo=logourl)
        return HttpResponse('ok')
    elif (prefix == ".png" or prefix == ".jpg") and opera == "uppic":
        upstate=Handle_upfile(f)
        if upstate != -1 and upstate != -2:
            picurl="http://appstoreapi.tvdfe.com:8090/%s"%os.path.basename(upstate)
            appinfo.objects.filter(appid=appid).update(mainpic=picurl)
        return HttpResponse('ok')
    else:
        return HttpResponse('无效操作')

@login_required()
def del_file(request):
    ''' 删除文件'''
    appid=request.POST['pk']
    tids = [ int(i) for i in appid.split(',') ]
    if len(tids) > 0:
        logodelete=appclassinfo.objects.filter(appid__in=tids).values_list('applogo')
        for logoname in logodelete:
            if logoname[0] != None:
                os.system('rm -f ../apkdown/%s'%os.path.basename(logoname[0]))
        apkdelete=appinfo.objects.filter(appid__in=tids).values_list('downloadurl','mainpic')
        for apk in apkdelete:
            if apk[0] != None:
                os.system('rm -f ../apkdown/%s'%os.path.basename(apk[0]))
            if apk[1] != None:
                os.system('rm -f ../apkdown/%s'%os.path.basename(apk[1]))
        appclassinfo.objects.filter(appid__in=tids).delete()
        appinfo.objects.filter(appid__in=tids).delete()
    return HttpResponse('ok')

@login_required()
def class_index(request,template_name):
    if request.method == 'GET':
        queryset=appclass.objects.all()
    elif request.method == 'POST':
        classid=request.POST["classid"]
        classname=request.POST["classname"]
        pk=request.POST["pk"]
        if request.POST['action'] == 'add':
            try:
                class_base=appclass.objects.create(classid=classid,classname=classname)
                class_base.save()
                return HttpResponse('ok')
            except Exception as error:
                return HttpResponse(str(error))
        else:
            try:
                class_base=appclass.objects.filter(pk=pk).update(classid=classid,classname=classname)
                return HttpResponse('ok')
            except Exception as error:
                return HttpResponse(str(error))

    search_fields = ['classname','classid']
    return get_datatables_records(
        request,
        queryset,
        search_fields,
        template_name,
        extra_context={
        })


@login_required()
def show_cl_data(request):
    pk=request.POST['pk']
    c_data=appclass.objects.get(pk=pk)
    data=[{'fields':{'classid':c_data.classid,'classname':c_data.classname,'pk':c_data.pk}}]
    return HttpResponse(json.dumps(data), 'application/javascript')

@login_required()
def del_class(request):
    pk=request.POST['pk']
    tids = [ int(i) for i in pk.split(',') ]
    if len(tids) > 0:
        appclass.objects.filter(id__in=tids).delete()
    return HttpResponse('ok')
