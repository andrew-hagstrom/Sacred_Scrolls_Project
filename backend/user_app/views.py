from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Favorites, JournalEntries
from .serializers import UserSerializer, FavoritesSerializer, JournalEntriesSerializer
from rest_framework import status
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)

class SignupView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = User.objects.create_user(**data)
            token = Token.objects.create(user=user)
            print(user, token.key)
            return JsonResponse(
                {"user": user.username, "token": token.key}, status=status.HTTP_201_CREATED
            )

        return JsonResponse(
            {"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

class LoginView(APIView):
    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        print(username, password)
        user = authenticate(username=username, password=password)
        print(user)

        if user is None:
            return JsonResponse(
                {"message": "Invalid user credentials provided"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token = Token.objects.get_or_create(user=user)
        token_str = token[0].key

        return JsonResponse({"token": token_str, "user": user.username})

class InfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({"username": request.user.username})

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return JsonResponse({"message":"logout successful."},status=HTTP_204_NO_CONTENT)

class FavoritesView(APIView):
    def get(self, request):
        favorites = FavoritesSerializer(Favorites.objects.all(), many=True)
        return Response(favorites.data, status=status.HTTP_200_OK)

class AFavoriteView(APIView):
    def get(self, request, book, chapter, verse):
        favorite = FavoritesSerializer(
            Favorites.objects.get(user_id=request.user, book=book, chapter=chapter, verse=verse)
        )
        return Response(favorite.data, status=status.HTTP_200_OK)

    def post(self, request, book, chapter, verse):
        added_favorite=FavoritesSerializer(Favorites(user_id=request.user, book=book, chapter=chapter, verse=verse))
        added_favorite.save()
        return Response(f'{added_favorite} has been added to your favorites', status=status.HTTP_201_CREATED)

    def delete(self, request, book, chapter, verse):
        del_favorite=Favorites.objects.get(book=book, chapter=chapter, verse=verse)
        del_favorite.delete()
        return Response(f'{del_favorite} has been deleted from your favorites', status=status.HTTP_204_NO_CONTENT)

class JournalView(APIView):
   def get(self, request):
       journal = JournalEntriesSerializer(Journal.objects.get(user_id=request.user))
       return Response(journal.data, status=status.HTTP_200_OK)

class JournalEntryView(APIView):
    def get(self, request, id):
        journal_entry = JournalEntriesSerializer(JournalEntries.objects.get(user_id=request.user, id=id))
        return Response(journal_entry.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        pass
   
    def post(self, request):
        added_entry = JournalEntriesSerializer(JournalEntries())

    def delete(self, request, id):  
       journal_entry = 

