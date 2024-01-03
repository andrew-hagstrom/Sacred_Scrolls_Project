from rest_framework import serializers
from user_app.models import User, Favorites, JournalEntries

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password']

class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ['id','user', 'source', 'reference', 'text', 'details']

class JournalEntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntries
        fields = ['user_id', 'text']



