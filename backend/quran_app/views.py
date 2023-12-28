import requests
# from django.shortcuts import render
# from django.db import models
from rest_framework.views import APIView
# from rest_framework.response import Response
# from sacred_scrolls_proj.settings import env 
from django.http import JsonResponse

class EngQurChapter(APIView):
    def get(self, request):
        
        return JsonResponse({"message":True})