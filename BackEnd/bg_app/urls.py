from django.urls import path
from .views import EngBGChapter, EngBGVerse, SanBGChapter, SanBGVerse

urlpatterns = [
    path('eng/chapter/<str:BGChapterNumber>/', EngBGChapter.as_view(), name="eng_bg_chapter"), 
    path('eng/chapter/<str:BGChapterNumber>/verse/<str:BGVerseNumber>/', EngBGVerse.as_view(), name="eng_bg_verse"),
    path('san/chapter/<str:BGChapterNumber>/', SanBGChapter.as_view(), name="eng_bg_chapter"), 
    path('san/chapter/<str:BGChapterNumber>/verse/<str:BGVerseNumber>/', SanBGVerse.as_view(), name="eng_bg_verse"),  
]