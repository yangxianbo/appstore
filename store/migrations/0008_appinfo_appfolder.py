# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_auto_20160428_1938'),
    ]

    operations = [
        migrations.AddField(
            model_name='appinfo',
            name='appfolder',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
