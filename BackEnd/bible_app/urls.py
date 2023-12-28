from django.urls import path
from .views import EngBibChapter, EngBibVerse, GrkBibChapter, GrkBibVerse, HebBibChapter, HebBibVerse

urlpatterns = [
    path('eng/<str:EngBibBookID>/<str:EngBibChapterNumber>/', EngBibChapter.as_view(), name="eng_bib_chapter"), 
    path('eng/<str:EngBibBookID>/<str:EngBibChapterNumber>/<str:EngBibVerseNumber>/', EngBibVerse.as_view(), name="eng_bib_verse"), 
    path('grk/<str:GrkBibBookID>/<str:GrkBibChapterNumber>/', GrkBibChapter.as_view(), name="grk_bib_chapter"), 
    path('grk/<str:GrkBibBookID>/<str:GrkBibleChapterNumber>/<str:GrkBibVerseNumber>/', GrkBibVerse.as_view(), name="grk_bib_verse"), 
    path('heb/<str:HebBibBookID>/<str:HebBibChapterNumber>/', HebBibChapter.as_view(), name="heb_bib_chapter"), 
    path('heb/<str:HebBibBookID>/<str:HebBibChapterNumber>/<str:HebBibVerseNumber>/', HebBibVerse.as_view(), name="heb_bib_verse"), 
]