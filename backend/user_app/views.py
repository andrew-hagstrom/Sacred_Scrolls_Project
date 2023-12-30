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
        favorites = Favorites.objects.filter(user=request.user)
        favorites_serialized = FavoritesSerializer(favorites, many=True)
        return Response(favorites_serialized.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        new_favorite = FavoritesSerializer(data=request.data)
        if new_favorite.is_valid():
            new_favorite.save()
            return Response(new_favorite.data, status=HTTP_201_CREATED)
        else:
            return Response(new_favorite.errors, status=HTTP_400_BAD_REQUEST)

class AFavoriteView(APIView):
    def get(self, request, id):
        try:
            favorite = Favorites.objects.get(user=request.user, id=id)
            favorite_serialized = FavoritesSerializer(favorite)
            return Response(favorite_serialized.data, status=status.HTTP_200_OK)
        except Favorites.DoesNotExist:
            return Response({"message": "Favorite not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        try:
            del_favorite = Favorites.objects.get(user=request.user, id=id)
            del_favorite.delete()
            return Response({"message": "Favorite deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Favorites.DoesNotExist:
            return Response({"message": "Favorite not found"}, status=status.HTTP_404_NOT_FOUND)

class JournalView(APIView):
    def get(self, request):
       journal = JournalEntriesSerializer(JournalEntries.objects.get(user_id=request.user))
       return Response(journal.data, status=status.HTTP_200_OK)
   
    def post(self, request):
        new_journal_entry = JournalEntriesSerializer(data=request.data)
        if new_journal_entry.is_valid():
            new_journal_entry.save()
            return Response(new_journal_entry.data, status=HTTP_201_CREATED)
        else:
            return Response(new_journal_entry.errors, status=HTTP_400_BAD_REQUEST)
   
class JournalEntryView(APIView):
    def get(self, request, id):
        try:
            journal_entry = JournalEntries.objects.get(user=request.user, id=id)
            serialized_entry = JournalEntriesSerializer(journal_entry)
            return Response(serialized_entry.data, status=status.HTTP_200_OK)
        except JournalEntries.DoesNotExist:
            return Response({"message": "Journal entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, id):
        try:
            journal_entry = JournalEntries.objects.get(user=request.user, id=id)
            serializer = JournalEntriesSerializer(journal_entry, data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JournalEntries.DoesNotExist:
            return Response({"message": "Journal entry not found"}, status=status.HTTP_404_NOT_FOUND)
   
    def delete(self, request, id):
        try:
            journal_entry = JournalEntries.objects.get(user=request.user, id=id)
            journal_entry.delete()
            return Response({"message": "Journal entry deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except JournalEntries.DoesNotExist:
            return Response({"message": "Journal entry not found"}, status=status.HTTP_404_NOT_FOUND)


