from django.utils import timezone
from rest_framework import serializers
from .models import Posts


class PostsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    formatted_timestamp = serializers.SerializerMethodField()
    class Meta:
        model = Posts
        fields = ['username', 'book', 'chapter', 'verse', 'text','timestamp', 'formatted_timestamp']
    
    def get_formatted_timestamp(self, obj):
        user_timezone_time = obj.timestamp.astimezone(timezone.get_current_timezone())
        return user_timezone_time.strftime("%Y-%m-%d %I:%M:%S %p CST")