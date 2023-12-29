from rest_framework import serializers
from user_app.models import User, FavoritesModel, PassagesModel, JournalModel, PostsModel

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
        model = FavoritesModel
        fields = ['user_id','passage_id']

class PassagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassagesModel
        fields = ['language','reference', 'book', 'text']

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalModel
        fields = ['text', 'user_id']

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsModel
        fields = ['text','user_id']