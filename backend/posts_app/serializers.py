from rest_framework import serializers
from .models import Posts

class PostsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Posts
        fields = ['username', 'book', 'chapter', 'verse', 'text','timestamp']