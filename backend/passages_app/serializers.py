from rest_framework import serializers
from .models import Passages

class PassagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passages
        fields = ['language', 'book', 'chapter', 'verse', 'text']