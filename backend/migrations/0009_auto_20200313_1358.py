# Generated by Django 3.0.4 on 2020-03-13 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_auto_20200313_1345'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='high_school_state',
            field=models.CharField(default='New York', max_length=100),
        ),
        migrations.AddField(
            model_name='student',
            name='major_1',
            field=models.CharField(default='CS', max_length=100),
        ),
        migrations.AddField(
            model_name='student',
            name='major_2',
            field=models.CharField(default='AMS', max_length=100),
        ),
    ]