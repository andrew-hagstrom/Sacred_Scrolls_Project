from django.urls import path
from .views import EngBGChapterView, EngBGVerseView, SanBGChapterView, SanBGVerseView, BGKeywordSearchView


urlpatterns = [
    path('eng/chapter/<str:chapter_number>/', EngBGChapterView.as_view(), name="eng_bg_chapter"), 
    path('eng/chapter/<str:chapter_number>/verse/<str:verse_number>/', EngBGVerseView.as_view(), name="eng_bg_verse"),
    path('san/chapter/<str:chapter_number>/', SanBGChapterView.as_view(), name="san_bg_chapter"), 
    path('san/chapter/<str:chapter_number>/verse/<str:verse_number>/', SanBGVerseView.as_view(), name="san_bg_verse"),
    path('search/<str:keyword>/', BGKeywordSearchView.as_view(), name="gita_search"),  
]