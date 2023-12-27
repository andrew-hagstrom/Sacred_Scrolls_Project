from django.shortcuts import render
from django.contrib.auth import authenticate
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
    HTTP_401_UNAUTHORIZED,
)


# Create your views here.
class Signup(APIView):
    def post(self, request):
        data = request.data

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            # user = serializer.save()
            user = User.objects.create_user(**data)
            token = Token.objects.create(user=user)
            return JsonResponse(
                {"message": "user created successfully."}, status=HTTP_201_CREATED
            )
            
        return JsonResponse(
            {"message": serializer.errors}, status=HTTP_400_BAD_REQUEST
        )


class Login(APIView):
    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        print(username, password)
        user = authenticate(username=username, password=password)
        print(user)
        
        if user is None:
            return JsonResponse({"message":"Invalid user credentials provided"}, status=HTTP_401_UNAUTHORIZED)
        
        token = Token.objects.get_or_create(user=user)
        token_str = token[0].key
        
        return JsonResponse({"token":token_str, "user":user.username})
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return JsonResponse({"username":request.user.username})