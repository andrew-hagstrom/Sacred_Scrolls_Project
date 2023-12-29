from django.urls import path
from .views import QurChapter, QurChapterVerse, QurKeywordSearch

urlpatterns = [
    path(
        "<str:lang>/chapter/<str:QurChapterNumber>/",
        QurChapter.as_view(),
        name="quran chapter",
    ),
    path(
        "<str:lang>/chapter/<str:QurChapterNumber>/verse/<str:QurVerseNumber>/",
        QurChapterVerse.as_view(),
        name="quran chapter and verse",
    ),
    path(
        "<str:lang>/<str:keyword>/",
        QurKeywordSearch.as_view(),
        name="quran keyword search",
    ),
]
