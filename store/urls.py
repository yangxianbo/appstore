#!/usr/bin/python2.7
#coding:utf-8
#AUTHOR: yangxb
#CREATER: 2016-04-27 09:56:35
#FILENAME: urls.py
#DESCRIPTION: 
#===============================================================


from django.conf.urls import include, url, patterns
urlpatterns = patterns('store.views',
    url(r'^LeftMenu$', 'get_app_class', name='get_app_class'),
    url(r'^AppMenu$', 'get_app_base', name='get_app_base'),
    url(r'^AppInfo$', 'get_app_info', name='get_app_info'),
    url(r'^AppSearch$', 'search_app', name='search_app'),
    url(r'^show_md_data/$', 'show_md_data', name='show_md_data'),
    url(r'^show_cl_data/$', 'show_cl_data', name='show_cl_data'),
    url(r'^delapk$', 'del_file', name='del_file'),
    url(r'^upapk$', 'up_file', name='up_file'),
    url(r'^delclass$', 'del_class', name='del_class'),
    url(r'^Store_index/$', 'store_index', {'template_name':'appupload/store_index.html'}, name='store_index'),
    url(r'^Class_index/$', 'class_index', {'template_name':'appclass/class_index.html'}, name='class_index'),
)
