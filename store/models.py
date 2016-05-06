from django.db import models

# Create your models here.
class appclass(models.Model):
    classid=models.CharField(max_length=50,unique=True)
    classname=models.CharField(max_length=255,null=True,blank=True)

class appclassinfo(models.Model):
    appid=models.CharField(max_length=50,unique=True)
    classid=models.CharField(max_length=50,null=True,blank=True)
    appfolder=models.CharField(max_length=255,null=True,blank=True)
    appname=models.CharField(max_length=50,null=True,blank=True)
    applogo=models.CharField(max_length=255,null=True,blank=True)
    appsearch=models.CharField(max_length=50,null=True,blank=True)

class appinfo(models.Model):
    appid=models.CharField(max_length=50,unique=True)
    appfolder=models.CharField(max_length=255,null=True,blank=True)
    uptime=models.CharField(max_length=255,null=True,blank=True)
    appdesc=models.CharField(max_length=255,null=True,blank=True)
    version=models.CharField(max_length=255,null=True,blank=True)
    downloadurl=models.CharField(max_length=255,null=True,blank=True)
    appsize=models.CharField(max_length=50,null=True,blank=True)
    level=models.CharField(max_length=10,null=True,blank=True)
    mainpic=models.CharField(max_length=255,null=True,blank=True)
