from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)

# Create your views here.
class Signup(APIView):
    def post(self, request):
        data = request.data
        # # create user with request data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            return JsonResponse({"message":"user created successfully."},status=HTTP_201_CREATED)
        else:
            return JsonResponse({"message":serializer.errors}, status=HTTP_400_BAD_REQUEST)