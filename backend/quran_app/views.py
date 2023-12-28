import requests
# from django.shortcuts import render
# from django.db import models
from rest_framework.views import APIView
# from rest_framework.response import Response
# from sacred_scrolls_proj.settings import env 
from django.http import JsonResponse

class EngQurChapter(APIView):
    def get(self, request, QurChapterNumber):
        api_url = f'http://api.alquran.cloud/v1/surah/{QurChapterNumber}/en.asad'
        headers = {
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            data = response.json()["data"]
            return JsonResponse({'data':data})
            
        except requests.exceptions.RequestException as e:
           
            print(f"Error accessing API: {e}")
            return None
        
        # http://api.alquran.cloud/v1/surah/2/en.asad
        