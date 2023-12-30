from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator

class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        blank=False,
        validators=[EmailValidator]
    )
    username = models.CharField(
        max_length=50,
        unique=True,
        null=False,
    )
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

class Passages(models.Model):
    language=models.CharField(max_length=100, default=None)
    book = models.CharField(default=None)
    chapter = models.IntegerField(default=None)
    verse = models.CharField(default=None)
    text = models.TextField(default=None)

class Favorites(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_id')
    language=models.CharField(max_length=100, default='English')
    book = models.CharField(default=None)
    chapter = models.IntegerField(default=None)
    verse = models.CharField(default=None)
    text = models.TextField(default=None)

class Journal(models.Model):
    text = models.CharField(max_length=100, default=None)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal_user_id')

class Posts(models.Model):
    text = models.CharField(max_length=100, default=None, null=False, blank=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_user_id')

