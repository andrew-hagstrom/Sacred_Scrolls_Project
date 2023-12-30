from django.urls import path
from .views import EngBGChapterView, EngBGVerseView, SanBGChapterView, SanBGVerseView, BGKeywordSearchView


urlpatterns = [
    path('eng/chapter/<str:BGChapterNumber>/', EngBGChapterView.as_view(), name="eng_bg_chapter"), 
    path('eng/chapter/<str:BGChapterNumber>/verse/<str:BGVerseNumber>/', EngBGVerseView.as_view(), name="eng_bg_verse"),
    path('san/chapter/<str:BGChapterNumber>/', SanBGChapterView.as_view(), name="san_bg_chapter"), 
    path('san/chapter/<str:BGChapterNumber>/verse/<str:BGVerseNumber>/', SanBGVerseView.as_view(), name="san_bg_verse"),
    path('search/<str:keyword>/', BGKeywordSearchView.as_view(), name="gita_search"),  
]