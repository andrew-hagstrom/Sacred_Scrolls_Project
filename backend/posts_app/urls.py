from django.urls import path
from .views import AllPassagePostsView, AllUserPostsView, APostView, AllPostsView

urlpatterns = [
    path("", AllPostsView.as_view(), name="all_posts"),
    path("passageposts/", AllPassagePostsView.as_view(), name="all_passageposts"),
    path("<str:username>/", AllUserPostsView.as_view(), name="all_userposts"),
    path("<str:username>/post/<int:id>/", APostView.as_view(), name="apost"),
]