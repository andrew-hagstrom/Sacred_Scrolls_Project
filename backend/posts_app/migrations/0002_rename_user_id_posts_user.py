# Generated by Django 5.0 on 2024-01-03 20:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='posts',
            old_name='user_id',
            new_name='user',
        ),
    ]