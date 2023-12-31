import requests
from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from sacred_scrolls_proj.settings import env 


class EngBibChapterView(APIView):
    api_key = env.get('BIBLE_API_KEY')

    def get_chapter_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  
            data = response.json()   
            return data
        except requests.exceptions.RequestException as e:
            return None
  
    def get(self, request, EngBibBookID, EngBibChapterNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/chapters/{EngBibBookID}.{EngBibChapterNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"
        api_key = env.get('BIBLE_API_KEY')
        chapter_data = self.get_chapter_data(api_url, api_key)
        return Response(chapter_data['data']['content'])

class EngBibVerseView(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
            return None
        
    def get(self, request, EngBibBookID, EngBibChapterNumber, EngBibVerseNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/verses/{EngBibBookID}.{EngBibChapterNumber}.{EngBibVerseNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false"
        api_key = env.get('BIBLE_API_KEY')
        verse_data = self.get_verse_data(api_url, api_key)
        return Response(verse_data['data']['content'])
        
class GrkBibChapterView(APIView):
    def get_chapter_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
            return None

    def get(self, request, GrkBibBookID, GrkBibChapterNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/7644de2e4c5188e5-01/chapters/{GrkBibBookID}.{GrkBibChapterNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"
        api_key = env.get('BIBLE_API_KEY')
       
        chapter_data = self.get_chapter_data(api_url, api_key)
        return Response(chapter_data['data']['content'])
    
class GrkBibVerseView(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
           
            return None

    def get(self, request, GrkBibBookID, GrkBibChapterNumber, GrkBibVerseNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/7644de2e4c5188e5-01/verses/{GrkBibBookID}.{GrkBibChapterNumber}.{GrkBibVerseNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false"
        api_key = env.get('BIBLE_API_KEY')
        verse_data = self.get_verse_data(api_url, api_key)
        return Response(verse_data['data']['content'])
    

class HebBibChapterView(APIView):
        def get_chapter_data(self, api_url, api_key):
            headers = {
                'api-key': api_key,
                'Content-Type': 'application/json',  
            }
            try:
                response = requests.get(api_url, headers=headers)
                response.raise_for_status()  
                data = response.json()  
                return data
            except requests.exceptions.RequestException as e:
            
                return None

        def get(self, request, HebBibBookID, HebBibChapterNumber):
            api_url = f"https://api.scripture.api.bible/v1/bibles/0b262f1ed7f084a6-01/chapters/{HebBibBookID}.{HebBibChapterNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"
            api_key = env.get('BIBLE_API_KEY')        
            chapter_data = self.get_chapter_data(api_url, api_key)
            return Response(chapter_data['data']['content'])
    

class HebBibVerseView(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
           
            print(f"Error accessing API: {e}")
            return None

    def get(self, request, HebBibBookID, HebBibChapterNumber, HebBibVerseNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/0b262f1ed7f084a6-01/verses/{HebBibBookID}.{HebBibChapterNumber}.{HebBibVerseNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false"
        api_key = env.get('BIBLE_API_KEY')
        verse_data = self.get_verse_data(api_url, api_key)
        return Response(verse_data['data']['content'])

class BibleSearchView(APIView):
    def get_search_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
            return None

    def get(self, request, keyword):
        api_url = f"https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/search?query={keyword}&limit=500&sort=canonical&fuzziness=0"
        api_key = env.get('BIBLE_API_KEY')
        search_data = self.get_search_data(api_url, api_key)
        return Response(search_data['data'])

