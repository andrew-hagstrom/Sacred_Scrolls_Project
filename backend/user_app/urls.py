from django.urls import path
from .views import SignupView, LoginView, InfoView, LogoutView, PassagesView, UserPostsView, APostView

post_patterns = [
    path("<int:user_id>/posts/", UserPostsView.as_view(), name="posts"),
    path("<int:user_id>/posts/<int:post_id>/", APostView.as_view(), name="posts"),
    path("<int:user_id>/posts/<int:post_id>/", APostView.as_view(), name="posts"),
]

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("info/", InfoView.as_view(), name="info"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("favorites/", LogoutView.as_view(), name="favorites"),
    path("journal/", LogoutView.as_view(), name="journal"),
    *post_patterns,
    path("passages/<int:passage_id>/", PassagesView.as_view(), name="passages"),
]
