# Generated by Django 5.0 on 2024-01-06 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts_app', '0011_rename_reference_posts_book_posts_chapter_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='text',
            field=models.TextField(default=None, max_length=400),
        ),
        migrations.AlterField(
            model_name='posts',
            name='verse',
            field=models.TextField(default='Verse'),
        ),
    ]
