from rest_framework import serializers
from .models import Passages

class PassagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passages
        fields = '__all__'
        fields = ['text','user_id', 'id']
        read_only_fields = ['id']