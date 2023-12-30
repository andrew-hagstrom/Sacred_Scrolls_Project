from django.urls import path
from .views import QurChapterView, QurChapterVerseView, QurKeywordSearchView

urlpatterns = [
    path(
        "<str:lang>/chapter/<str:QurChapterNumber>/",
        QurChapterView.as_view(),
        name="quran chapter",
    ),
    path(
        "<str:lang>/chapter/<str:QurChapterNumber>/verse/<str:QurVerseNumber>/",
        QurChapterVerseView.as_view(),
        name="quran chapter and verse",
    ),
    path(
        "<str:lang>/<str:keyword>/",
        QurKeywordSearchView.as_view(),
        name="quran keyword search",
    ),
]
