from django.urls import path
from .views import Signup, Login, Info, Logout, Passages

urlpatterns = [
    path("signup/", Signup.as_view(), name="signup"),
    path("login/", Login.as_view(), name="login"),
    path("info/", Info.as_view(), name="info"),
    path("logout/", Logout.as_view(), name="logout"),
    path("favorites/", Logout.as_view(), name="favorites"),
    path("journal/", Logout.as_view(), name="journal"),
    path("posts/", Logout.as_view(), name="posts"),
    path("passages/<int:passage_id>/", Passages.as_view(), name='passages')
]