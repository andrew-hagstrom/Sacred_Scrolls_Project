from django.db import models
from user_app.models import User

class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    book=models.CharField(max_length=500, default='Quran/Bible/BG', null=False, blank=False)
    chapter=models.CharField(max_length=100, default='Chapter', null=False, blank=False)
    verse=models.CharField(max_length=100, default='Verse', null=False, blank=False)
    text = models.TextField(null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
  