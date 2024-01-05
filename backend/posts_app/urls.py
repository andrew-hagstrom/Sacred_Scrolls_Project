from django.urls import path
from .views import AllPassagePostsView, AllUserPostsView, APostView

urlpatterns = [
    path("", AllPassagePostsView.as_view(), name="all_passageposts"),
    path("<str:username>/", AllUserPostsView.as_view(), name="all_userposts"),
    path("<str:username>/post/<int:id>/", APostView.as_view(), name="apost"),
]