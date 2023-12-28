import requests
from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from sacred_scrolls_proj.settings import env 



class EngBGChapter(APIView):
    def get_chapter_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            print(f"\n\n\n {response} \n\n\n")
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
           
            print(f"Error accessing API: {e}")
            return None
        
    def get(self, request, BGChapterNumber):
        api_url = f"https://bhagavad-gita3.p.rapidapi.com/v2/chapters/{BGChapterNumber}/verses/"
        api_key = env.get('BG_API_KEY')

        chapter_data = self.get_chapter_data(api_url, api_key)
        print(chapter_data)
        if chapter_data:
            print("API Data:")
            print(chapter_data)
        else:
            print("Failed to retrieve API data.")
        
        english_verses = [verse["description"] for verse in chapter_data["translations"] if verse["author_name"] == "Swami Adidevananda"]


        return Response(english_verses)

class EngBGVerse(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            print(f"\n\n\n {response} \n\n\n")
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
           
            print(f"Error accessing API: {e}")
            return None
        
    def get(self, request, BGChapterNumber, BGVerseNumber):
        api_url = f"https://bhagavad-gita3.p.rapidapi.com/v2/chapters/{BGChapterNumber}/verses/{BGVerseNumber}/"
        api_key = env.get('BG_API_KEY')

        verse_data = self.get_verse_data(api_url, api_key)
        print(verse_data)
        if verse_data:
            print("API Data:")
            print(verse_data)
        else:
            print("Failed to retrieve API data.")


        return Response(verse_data['translations'][0]['description'])

class SanBGChapter(APIView):
    def get_chapter_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            print(f"\n\n\n {response} \n\n\n")
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
           
            print(f"Error accessing API: {e}")
            return None
        
    def get(self, request, BGChapterNumber):
        api_url = f"https://bhagavad-gita3.p.rapidapi.com/v2/chapters/{BGChapterNumber}/verses/"
        api_key = env.get('BG_API_KEY')

        chapter_data = self.get_chapter_data(api_url, api_key)
        print(chapter_data)
        if chapter_data:
            print("API Data:")
            print(chapter_data)
        else:
            print("Failed to retrieve API data.")

        sanskrit_verses = [verse["description"] for verse in chapter_data["text"]]


        return Response(sanskrit_verses)

class SanBGVerse(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            print(f"\n\n\n {response} \n\n\n")
            response.raise_for_status()  
            data = response.json()  
            return data
        except requests.exceptions.RequestException as e:
           
            print(f"Error accessing API: {e}")
            return None
        
    def get(self, request, BGChapterNumber, BGVerseNumber):
        api_url = f"https://bhagavad-gita3.p.rapidapi.com/v2/chapters/{BGChapterNumber}/verses/{BGVerseNumber}/"
        api_key = env.get('BG_API_KEY')

        verse_data = self.get_verse_data(api_url, api_key)
        print(verse_data)
        if verse_data:
            print("API Data:")
            print(verse_data)
        else:
            print("Failed to retrieve API data.")

        return Response(verse_data['text'])
        
