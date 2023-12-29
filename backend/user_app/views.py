from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, FavoritesSerializer
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_204_NO_CONTENT,
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
            print(user, token.key)
            return JsonResponse(
                {"user": user.username, "token":token.key}, status=HTTP_201_CREATED
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
    
class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.user.auth_token.delete()
        return JsonResponse({"message":"logout successful."},status=HTTP_204_NO_CONTENT)
    

class Favorites(APIView):
    def get(self, request):
        favorites = FavoritesSerializer(Favorites.objects.all(), many=True)
        return Response(favorites.data, status=HTTP_200_OK)

class AFavorite(APIView):
    def get(self, request, passage_id):
         favorite = FavoritesSerializer(Favorites.objects.get(user_id=request.user, passage_id=passage_id))
         return Response(favorite.data, status=HTTP_200_OK)
     
    def post(self, request, passage):
        pass
    
    def delete(self, request, word):
        pass

class Passages(APIView):
    pass

class APassage(APIView):
    pass

class Journal(APIView):
    pass

class Posts(APIView):
    pass

class APost(APIView):
    pass