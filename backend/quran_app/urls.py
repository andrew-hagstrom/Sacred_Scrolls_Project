from django.urls import path
from .views import EngQurChapter

urlpatterns = [
    path("", EngQurChapter.as_view(), name="quran chapter")
]
