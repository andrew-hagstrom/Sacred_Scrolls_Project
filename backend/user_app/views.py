from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, PostsModel
from .serializers import UserSerializer, FavoritesSerializer, PostsSerializer
from rest_framework import status


# Create your views here.
class Signup(APIView):
    def post(self, request):
        data = request.data

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = User.objects.create_user(**data)
            token = Token.objects.create(user=user)
            print(user, token.key)
            return JsonResponse(
                {"user": user.username, "token": token.key}, status=HTTP_201_CREATED
            )

        return JsonResponse(
            {"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
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
            return JsonResponse(
                {"message": "Invalid user credentials provided"},
                status=HTTP_401_UNAUTHORIZED,
            )

        token = Token.objects.get_or_create(user=user)
        token_str = token[0].key

        return JsonResponse({"token": token_str, "user": user.username})


class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({"username": request.user.username})


class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return JsonResponse(
            {"message": "logout successful."}, status=HTTP_204_NO_CONTENT
        )


class Favorites(APIView):
    def get(self, request):
        favorites = FavoritesSerializer(Favorites.objects.all(), many=True)
        return Response(favorites.data, status=status.HTTP_200_OK)


class AFavorite(APIView):
    def get(self, request, passage_id):
        favorite = FavoritesSerializer(
            Favorites.objects.get(user_id=request.user, passage_id=passage_id)
        )
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


class UserPosts(APIView):
    def get(self, request, user_id):
        posts = PostsModel.objects.filter(user_id_id=user_id)
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


class APost(APIView):
    def get(self, request, user_id, post_id):
        post = None
        try:
            post = PostsModel.objects.get(id=post_id, user_id_id=user_id)
        except Exception as e:
            print(e)
            return JsonResponse({"error":"error occured fetching post from user"})
        
        serialized_post = PostsSerializer(post)
        return JsonResponse({"data": serialized_post.data})

    def put(self, request, user_id, post_id):
        data = request.data
        post = None
        try:
            post = PostsModel.objects.get(user_id_id=user_id, id=post_id)
        except Exception as e:
            print(e)
            return JsonResponse({"error": "Error while trying to fetch post."})

        updated_post = PostsSerializer(post, data=request.data, partial=True)

        if not updated_post.is_valid():
            return JsonResponse({"error": updated_post.errors})

        updated_post.save()
        return JsonResponse({"data": updated_post.data})

    def delete(self, request, user_id, post_id):
        post = PostsModel.objects.get(user_id_id=user_id, id=post_id)

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
