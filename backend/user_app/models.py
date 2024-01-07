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

class Favorites(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    language=models.CharField(max_length=100, default='English')
    source = models.CharField(default=None)
    reference = models.CharField(default=None)
    text=models.TextField(default=None)
    details=models.TextField(default=None)

class JournalEntries(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal_user_id')
    text = models.CharField(max_length=500, default=None, null=False, blank=False)
    title = models.CharField(max_length=100, default=None, null=False, blank=False)
    # TODO add created date
