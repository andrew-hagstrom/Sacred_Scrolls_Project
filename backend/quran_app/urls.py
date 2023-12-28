from django.urls import path
from .views import EngQurChapter

urlpatterns = [
    path('eng/chapter/<str:QurChapterNumber>/', EngQurChapter.as_view(), name="quran chapter")
]
