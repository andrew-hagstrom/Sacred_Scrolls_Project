from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Posts, Favorites
from .serializers import UserSerializer, FavoritesSerializer, PostsSerializer
from rest_framework import status
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)

class AllPostsView(APIView):
     def get(self, request):
        posts = Posts.objects.all()
        serialized_posts = PostsSerializer(posts, many=True)
        print(serialized_posts)
        return JsonResponse({"data": serialized_posts.data})

class UserPostsView(APIView):
    def get(self, request, user_id):
        posts = Posts.objects.filter(user_id_id=user_id)
        serialized_posts = PostsSerializer(posts, many=True)
        print(serialized_posts)
        return JsonResponse({"data": serialized_posts.data})

    def post(self, request, user_id):
        data = request.data
        data["user_id"] = user_id
        post_serializer = PostsSerializer(data=data)

        if not post_serializer.is_valid():
            return JsonResponse({"error": post_serializer.errors})
        try:
            post_serializer.save()
            return JsonResponse({"message": post_serializer.data})
        except Exception as e:
            print(e)
            return JsonResponse({"error": "Error saving to post to database"})


class APostView(APIView):
    def get(self, request, user_id, post_id):
        post = None
        try:
            post = Posts.objects.get(id=post_id, user_id_id=user_id)
        except Exception as e:
            print(e)
            return JsonResponse({"error": "error occured fetching post from user"})

        serialized_post = PostsSerializer(post)
        return JsonResponse({"data": serialized_post.data})

    def put(self, request, user_id, post_id):
        data = request.data
        post = None
        try:
            post = Posts.objects.get(user_id_id=user_id, id=post_id)
        except Exception as e:
            print(e)
            return JsonResponse({"error": "Error while trying to fetch post."})

        updated_post = PostsSerializer(post, data=request.data, partial=True)

        if not updated_post.is_valid():
            return JsonResponse({"error": updated_post.errors})

        updated_post.save()
        return JsonResponse({"data": updated_post.data})

    def delete(self, request, user_id, post_id):
        post = Posts.objects.get(user_id_id=user_id, id=post_id)

        try:
            post.delete()
        except Exception as e:
            print(e)
            return JsonResponse(
                {"error": "An error occured when deleting a post."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return JsonResponse(
            {"message": "post deleted sucessfully"},
            status=status.HTTP_200_OK,
        )

