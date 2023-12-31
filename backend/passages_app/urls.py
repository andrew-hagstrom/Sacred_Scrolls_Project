from django.urls import path
from .views import BG_Passage

urlpatterns = [
path("<int:passage_id>/", BG_Passage.as_view(), name="passages"),
]