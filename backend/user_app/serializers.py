from rest_framework import serializers
from user_app.models import User, Favorites, Journal, Posts, Passages

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password']

class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ['user_id','language', 'chapter', 'book', 'verse', 'text']

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ['text', 'user_id']

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['text','user_id']

class PassagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passages
        fields = '__all__'
