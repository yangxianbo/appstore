# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_appinfo_mainpic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appclassinfo',
            name='applogo',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
