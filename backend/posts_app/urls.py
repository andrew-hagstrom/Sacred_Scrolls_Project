from django.urls import path
from .views import AllPostsView, UserPostsView, APostView

post_patterns = [
    path("", AllPostsView.as_view(), name="all_posts"),
    path("<int:user_id>/", UserPostsView.as_view(), name="user_posts"),
    path("<int:user_id>/posts/<int:post_id>/", APostView.as_view(), name="apost"),
]