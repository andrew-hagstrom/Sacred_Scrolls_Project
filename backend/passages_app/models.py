from django.db import models

class Passages(models.Model):
    language=models.CharField(max_length=100, default=None)
    book = models.CharField(default=None)
    chapter = models.IntegerField(default=None)
    verse = models.CharField(default=None)
    text = models.TextField(default=None)