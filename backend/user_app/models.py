from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator
# Create your models here.
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
    reference = models.CharField(max_length=100, default=None)
    book = models.CharField(max_length=100, default=None)
    text = models.CharField(max_length=100, default=None)

class Favorites(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_id')
    passage_id = models.OneToOneField(Passages, on_delete=models.CASCADE, related_name='passage_id')

class Journal(models.Model):
    text = models.CharField(max_length=100, default=None)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal_user_id')

class Posts(models.Model):
    text = models.CharField(max_length=100, default=None)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_user_id')

