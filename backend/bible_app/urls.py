from django.urls import path
from .views import EngBibChapterView, EngBibVerseView, GrkBibChapterView, GrkBibVerseView, HebBibChapterView, HebBibVerseView, BibleSearchView

urlpatterns = [
    path('eng/<str:EngBibBookID>/chapter/<str:EngBibChapterNumber>/', EngBibChapterView.as_view(), name="eng_bib_chapter"), 
    path('eng/<str:EngBibBookID>/chapter/<str:EngBibChapterNumber>/verse/<str:EngBibVerseNumber>/', EngBibVerseView.as_view(), name="eng_bib_verse"), 
    path('grk/<str:GrkBibBookID>/chapter/<str:GrkBibChapterNumber>/', GrkBibChapterView.as_view(), name="grk_bib_chapter"), 
    path('grk/<str:GrkBibBookID>/chapter/<str:GrkBibChapterNumber>/verse/<str:GrkBibVerseNumber>/', GrkBibVerseView.as_view(), name="grk_bib_verse"), 
    path('heb/<str:HebBibBookID>/chapter/<str:HebBibChapterNumber>/', HebBibChapterView.as_view(), name="heb_bib_chapter"), 
    path('heb/<str:HebBibBookID>/chapter/<str:HebBibChapterNumber>/verse/<str:HebBibVerseNumber>/', HebBibVerseView.as_view(), name="heb_bib_verse"), 
    path('<str:keyword>/', BibleSearchView.as_view(), name="bib_search"), 
]