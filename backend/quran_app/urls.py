from django.urls import path
from .views import EngQurChapter, EngQurChapterVerse

urlpatterns = [
    path('eng/chapter/<str:QurChapterNumber>/', EngQurChapter.as_view(), name="quran chapter"),
    path('eng/chapter/<str:QurChapterNumber>/verse/<str:QurVerseNumber>/', EngQurChapterVerse.as_view(), name="quran chapter and verse")
]
