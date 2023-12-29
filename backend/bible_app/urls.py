from django.urls import path
from .views import EngBibChapter, EngBibVerse, GrkBibChapter, GrkBibVerse, HebBibChapter, HebBibVerse, BibleSearch

urlpatterns = [
    path('eng/<str:EngBibBookID>/chapter/<str:EngBibChapterNumber>/', EngBibChapter.as_view(), name="eng_bib_chapter"), 
    path('eng/<str:EngBibBookID>/chapter/<str:EngBibChapterNumber>/verse/<str:EngBibVerseNumber>/', EngBibVerse.as_view(), name="eng_bib_verse"), 
    path('grk/<str:GrkBibBookID>/chapter/<str:GrkBibChapterNumber>/', GrkBibChapter.as_view(), name="grk_bib_chapter"), 
    path('grk/<str:GrkBibBookID>/chapter/<str:GrkBibChapterNumber>/verse/<str:GrkBibVerseNumber>/', GrkBibVerse.as_view(), name="grk_bib_verse"), 
    path('heb/<str:HebBibBookID>/chapter/<str:HebBibChapterNumber>/', HebBibChapter.as_view(), name="heb_bib_chapter"), 
    path('heb/<str:HebBibBookID>/chapter/<str:HebBibChapterNumber>/verse/<str:HebBibVerseNumber>/', HebBibVerse.as_view(), name="heb_bib_verse"), 
    path('<str:keyword>/', BibleSearch.as_view(), name="bib_search"), 
]