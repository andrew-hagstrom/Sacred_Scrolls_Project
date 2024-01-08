from rest_framework import serializers
from user_app.models import User, Favorites, JournalEntries


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'

    def to_representation(self, instance):
        representation = super(FavoritesSerializer, self).to_representation(instance)
        if 'reference' in representation:
            representation['reference'] = representation['reference'].title()
        return representation



class JournalEntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntries
        fields = ["id","user", "title", "text"]