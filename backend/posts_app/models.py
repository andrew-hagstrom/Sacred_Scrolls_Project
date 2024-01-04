from django.db import models
from user_app.models import User

class Posts(models.Model):
    text = models.CharField(max_length=100, default=None, null=False, blank=False)
    reference=models.CharField(max_length=100, default=None, null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    user=models.CharField(max_length=100, default=None, null=False, blank=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_user_id')
