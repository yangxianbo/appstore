#!/usr/bin/python2.7
#coding:utf-8
#AUTHOR: yangxb
#CREATER: 2016-04-20 15:23:39
#FILENAME: handle_upfile.py
#DESCRIPTION: 
#===============================================================

import base
import os
def Handle_upfile(f):
    try:
        filename=f.name
        path = "./appdown/%s"%filename
        destination = open(path, 'wb+')
        for chunk in f.chunks():
            destination.write(chunk)
        destination.close()
        return os.path.abspath(path)
    except Exception:
        return -1

