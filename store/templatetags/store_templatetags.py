#!/usr/bin/python2.7
#coding:utf-8
#AUTHOR: yangxb
#CREATER: 2016-04-27 14:43:34
#FILENAME: store_templatetags.py
#DESCRIPTION: 
#===============================================================
import json,re, time, os, datetime
from django import template
from store.models import appclass
register = template.Library()

def show_name(classid):
    return appclass.objects.get(classid=classid).classname

register.filter(show_name)
