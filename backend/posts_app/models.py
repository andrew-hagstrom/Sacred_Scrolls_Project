from django.db import models

class Posts(models.Model):
    text = models.CharField(max_length=100, default=None, null=False, blank=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_user_id')
