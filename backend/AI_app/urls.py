from django.urls import path
from .views import WordAnalysis

urlpatterns = [
path("word/<str:word>/", WordAnalysis.as_view(), name="word analysis"),
]