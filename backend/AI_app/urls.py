from django.urls import path
from .views import WordAnalysis, Commentary

urlpatterns = [
path("word/<str:word>/", WordAnalysis.as_view(), name="word analysis"),
path("commentary/<str:Book>/<str:Chapter>/<str:Verse>/", Commentary.as_view(), name="commentary"),
]