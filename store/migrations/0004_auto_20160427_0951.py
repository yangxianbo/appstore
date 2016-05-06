# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20160426_1802'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appinfo',
            name='appsearch',
        ),
        migrations.AddField(
            model_name='appclassinfo',
            name='appsearch',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
