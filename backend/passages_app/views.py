from django.core.management import call_command
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import Passages, PassagesSerializer
from rest_framework import status
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)

class BG_Passage(APIView):
    def get(self, request, passage_id):
        call_command('loaddata', 'gita_fixture.json', verbosity=0)
        try:
            passage = Passages.objects.get(id=passage_id)
            ser_passage = PassagesSerializer(passage)
            return Response(ser_passage.data, status=status.HTTP_200_OK)
        except Passages.DoesNotExist:
            return Response({"message": "Passage not found"}, status=status.HTTP_404_NOT_FOUND)

