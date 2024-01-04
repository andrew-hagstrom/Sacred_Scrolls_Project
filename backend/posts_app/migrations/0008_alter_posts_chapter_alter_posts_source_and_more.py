# Generated by Django 5.0 on 2024-01-04 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts_app', '0007_rename_reference_posts_chapter_posts_source_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='chapter',
            field=models.CharField(default='Chapter', max_length=100),
        ),
        migrations.AlterField(
            model_name='posts',
            name='source',
            field=models.CharField(default='Quran/Bible/BG', max_length=100),
        ),
        migrations.AlterField(
            model_name='posts',
            name='verse',
            field=models.CharField(default='Verse', max_length=100),
        ),
    ]