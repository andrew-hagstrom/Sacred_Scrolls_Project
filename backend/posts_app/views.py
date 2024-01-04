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
     def get(self, request):
        posts = Posts.objects.all()
        serialized_posts = PostsSerializer(posts, many=True)
        print(serialized_posts)
        return Response(serialized_posts.data)

class UserPostsView(APIView):
    def get(self, request, user_id):
        posts = Posts.objects.filter(user_id=user_id)
        serialized_posts = PostsSerializer(posts, many=True)
        print(serialized_posts)
        return Response({"data": serialized_posts.data})

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            text = request.data.get('text')

            post_data = {'user_id': user.id, 'text': text}

            new_post_serializer = PostsSerializer(data=post_data)

            if new_post_serializer.is_valid():
                new_post_serializer.save()
                return Response({"message": "Post created successfully"}, status=status.HTTP_201_CREATED)
            else:
                # Return errors if the data is not valid
                return Response({"error": new_post_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class APostView(APIView):
    def get(self, request, user_id, post_id):
        post = None
        try:
            post = Posts.objects.get(id=post_id, user_id=user_id)
        except Exception as e:
            print(e)
            return Response({"error": "error occured fetching post from user"})

        serialized_post = PostsSerializer(post)
        return Response({"data": serialized_post.data})

    def put(self, request, user, post_id):
        data = request.data
        post = None
        try:
            post = Posts.objects.get(user=user, id=post_id)
        except Exception as e:
            print(e)
            return Response({"error": "Error while trying to fetch post."})

        updated_post = PostsSerializer(post, data=request.data, partial=True)

        if not updated_post.is_valid():
            return Response({"error": updated_post.errors})

        updated_post.save()
        return Response({"data": updated_post.data})

    def delete(self, request, user, post_id):
        post = Posts.objects.get(user=user, id=post_id)

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

