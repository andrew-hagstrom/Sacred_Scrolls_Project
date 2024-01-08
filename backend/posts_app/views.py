from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Posts
from .serializers import PostsSerializer
from rest_framework import status
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)

class AllPostsView(APIView):
    def get (self, request):
        posts = Posts.objects.all()
        serialized_posts = PostsSerializer(posts, many=True)
        return Response(serialized_posts.data)

class AllPassagePostsView(APIView):
     def get(self, request):
        book = request.query_params.get("book")
        chapter = request.query_params.get("chapter")
        verse = request.query_params.get("verse")
        posts = Posts.objects.filter(book=book, chapter=chapter, verse=verse)
        serialized_posts = PostsSerializer(posts, many=True)
        return Response(serialized_posts.data)

class AllUserPostsView(APIView):
    def get(self, request, username):
        user=User.objects.get(username=username)
        posts = Posts.objects.filter(user=user)
        serialized_posts = PostsSerializer(posts, many=True)
        print(serialized_posts)
        return Response(serialized_posts.data)

    def post(self, request, username):
        user = User.objects.get(username=username)
        text = request.data.get('text')
        book = request.data.get("book")
        chapter = request.data.get("chapter")
        verse = request.data.get("verse")
        new_post=Posts(user=user, book=book, chapter=chapter, verse=verse, text=text)
        ser_new_post=PostsSerializer(new_post)
        new_post.save()
        return Response(ser_new_post.data)

class APostView(APIView):
    def get(self, request, username, id):
        try:
            user = User.objects.get(username=username)
            post = Posts.objects.get(id=id, user=user)
        except Exception as e:
            print(e)
            return Response({"error": "error occured fetching post from user"})

        serialized_post = PostsSerializer(post)
        return Response({"data": serialized_post.data})

    def put(self, request, username, id):
        try:
            user = User.objects.get(username=username)
            post = Posts.objects.get(id=id, user=user)
        except Exception as e:
            print(e)
            return Response({"error": "Error while trying to fetch post."})
        
        updated_post = PostsSerializer(post, data={'text': request.data.get('text')}, partial=True)

        if not updated_post.is_valid():
            return Response({"error": updated_post.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        updated_post.save()
        return Response({"data": updated_post.data}, status=status.HTTP_200_OK)

    def delete(self, request, username, id):
        user = User.objects.get(username=username)
        post = Posts.objects.get(user=user, id=id)
        try:
            post.delete()
        except Exception as e:
            print(e)
            return Response(
                {"error": "An error occured when deleting a post."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response(
            {"message": "post deleted sucessfully"},
            status=status.HTTP_200_OK,
        )


