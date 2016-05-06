# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_appinfo_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='appinfo',
            name='mainpic',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
