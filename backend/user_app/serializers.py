from rest_framework import serializers
from user_app.models import User, Favorites, Journal, JournalEntry

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
        fields = ['chapter', 'book', 'verse', 'text']

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ['user_id', 'text']

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta: 
        model=JournalEntry
        fields=['journal_id', 'text']


