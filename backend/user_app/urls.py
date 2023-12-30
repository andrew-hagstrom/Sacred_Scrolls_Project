from django.urls import path
from .views import SignupView, LoginView, InfoView, LogoutView, FavoritesView, AFavoriteView, JournalView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("info/", InfoView.as_view(), name="info"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("favorites/", FavoritesView.as_view(), name="favorites"),
    path("favorite/<str:book>/<int:chapter>/<int:verse>", AFavoriteView.as_view(), name='favorite'),
    path("journal/", JournalView.as_view(), name="journal"),
    path("journal/<int:id>", JournalView.as_view(), name="journal_entry"),
]
