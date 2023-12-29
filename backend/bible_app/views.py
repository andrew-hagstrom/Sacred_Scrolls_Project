import requests
from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from sacred_scrolls_proj.settings import env 


class EngBibChapter(APIView):
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
        
    def get(self, request, EngBibBookID, EngBibChapterNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/chapters/{EngBibBookID}.{EngBibChapterNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"
        api_key = env.get('BIBLE_API_KEY')

        chapter_data = self.get_chapter_data(api_url, api_key)
        print(chapter_data)
        if chapter_data:
            print("API Data:")
            print(chapter_data)
        else:
            print("Failed to retrieve API data.")

        return Response(chapter_data['data']['content'])

class EngBibVerse(APIView):
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
        
    def get(self, request, EngBibBookID, EngBibChapterNumber, EngBibVerseNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/verses/{EngBibBookID}.{EngBibChapterNumber}.{EngBibVerseNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false"
        api_key = env.get('BIBLE_API_KEY')

        verse_data = self.get_verse_data(api_url, api_key)
        print(verse_data)
        if verse_data:
            print("API Data:")
            print(verse_data)
        else:
            print("Failed to retrieve API data.")

        return Response(verse_data['data']['content'])
        

class GrkBibChapter(APIView):
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

    def get(self, request, GrkBibBookID, GrkBibChapterNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/7644de2e4c5188e5-01/chapters/{GrkBibBookID}.{GrkBibChapterNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"
        api_key = env.get('BIBLE_API_KEY')
       
        chapter_data = self.get_chapter_data(api_url, api_key)
        print(chapter_data)
        if chapter_data:
            print("API Data:")
            print(chapter_data)
        else:
            print("Failed to retrieve API data.")

        return Response(chapter_data['data']['content'])
    


class GrkBibVerse(APIView):
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

    def get(self, request, GrkBibBookID, GrkBibChapterNumber, GrkBibVerseNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/7644de2e4c5188e5-01/verses/{GrkBibBookID}.{GrkBibChapterNumber}.{GrkBibVerseNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false"
        api_key = env.get('BIBLE_API_KEY')
        verse_data = self.get_verse_data(api_url, api_key)
        print(verse_data)
        if verse_data:
            print("API Data:")
            print(verse_data)
        else:
            print("Failed to retrieve API data.")

        return Response(verse_data['data']['content'])
    

class HebBibChapter(APIView):
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

        def get(self, request, HebBibBookID, HebBibChapterNumber):
            api_url = f"https://api.scripture.api.bible/v1/bibles/0b262f1ed7f084a6-01/chapters/{HebBibBookID}.{HebBibChapterNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"
            api_key = env.get('BIBLE_API_KEY')
        
            chapter_data = self.get_chapter_data(api_url, api_key)
            print(chapter_data)
            if chapter_data:
                print("API Data:")
                print(chapter_data)
            else:
                print("Failed to retrieve API data.")

            return Response(chapter_data['data']['content'])
    

class HebBibVerse(APIView):
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

    def get(self, request, HebBibBookID, HebBibChapterNumber, HebBibVerseNumber):
        api_url = f"https://api.scripture.api.bible/v1/bibles/0b262f1ed7f084a6-01/verses/{HebBibBookID}.{HebBibChapterNumber}.{HebBibVerseNumber}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false"
        api_key = env.get('BIBLE_API_KEY')
        verse_data = self.get_verse_data(api_url, api_key)
        print(verse_data)
        if verse_data:
            print("API Data:")
            print(verse_data)
        else:
            print("Failed to retrieve API data.")

        return Response(verse_data['data']['content'])

class BibleSearch(APIView):
    def get_search_data(self, api_url, api_key):
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

    def get(self, request, keyword):
        api_url = f"https://api.scripture.api.bible/v1/bibles/bba9f40183526463-01/search?query={keyword}&limit=100&sort=relevance"
        api_key = env.get('BIBLE_API_KEY')
        search_data = self.get_search_data(api_url, api_key)
        print(search_data)
        if search_data:
            print("API Data:")
            print(search_data)
        else:
            print("Failed to retrieve API data.")

        return Response(search_data['data'])

