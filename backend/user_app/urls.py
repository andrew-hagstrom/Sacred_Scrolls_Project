from django.urls import path
from .views import Signup, Login, Info, Logout, Passages, UserPosts, APost

post_patterns = [
    path("<int:user_id>/posts/", UserPosts.as_view(), name="posts"),
    path("<int:user_id>/posts/<int:post_id>/", APost.as_view(), name="posts"),
    path("<int:user_id>/posts/<int:post_id>/", APost.as_view(), name="posts"),
]

urlpatterns = [
    path("signup/", Signup.as_view(), name="signup"),
    path("login/", Login.as_view(), name="login"),
    path("info/", Info.as_view(), name="info"),
    path("logout/", Logout.as_view(), name="logout"),
    path("favorites/", Logout.as_view(), name="favorites"),
    path("journal/", Logout.as_view(), name="journal"),
    *post_patterns,
    path("passages/<int:passage_id>/", Passages.as_view(), name="passages"),
]
