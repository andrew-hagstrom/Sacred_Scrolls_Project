
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('posts_app', '0005_posts_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='user',
            field=models.CharField(default='John Doe', max_length=100),
        ),
    ]
