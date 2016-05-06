# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_auto_20160426_1740'),
    ]

    operations = [
        migrations.AddField(
            model_name='appclassinfo',
            name='appfolder',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='appclassinfo',
            name='appname',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
