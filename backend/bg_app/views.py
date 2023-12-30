import requests
from django.shortcuts import render
from django.db import models
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from sacred_scrolls_proj.settings import env 
from user_app.serializers import PassagesSerializer, Passages


class EngBGChapter(APIView):
    def get_chapter_data(self, api_url, api_key):
        headers = {
            'X-RapidAPI-Key': api_key,
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
            english_verses = []
            for verse in chapter_data:
                translations = verse.get("translations", [])
                for translation in translations:
                    if (translation.get("author_name") == "Swami Adidevananda" 
                            and translation.get("language") == "english"):
                        english_verses.append(f"{verse['chapter_number']}.{verse['verse_number']} {translation['description']}")
                        break 
            if english_verses:
                fluid_text = ' '.join(english_verses)
                return Response(fluid_text)
            else:
                return Response("No English translations by Swami Adidevananda found for this chapter.")
                            
        else:
            return Response("Failed to retrieve API data.")
 

class EngBGVerse(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'X-RapidAPI-Key': api_key,
            'Content-Type': 'application/json',  
        }
        try:
            response = requests.get(api_url, headers=headers)
            # print(f"\n\n\n {response} \n\n\n")
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
        # print(verse_data)
        # if verse_data:
        #     # print("API Data:")
        #     # print(verse_data)
        # else:
        #     print("Failed to retrieve API data.")

        print(verse_data['translations'][0]['description'])
        return Response(verse_data['translations'][0]['description'])

class SanBGChapter(APIView):
    def get_chapter_data(self, api_url, api_key):
        headers = {
            'X-RapidAPI-Key': api_key,
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

        
        sanskrit_verses = [item.get('text', '') for item in chapter_data]
        
        sanskrit_verses_without_newlines = [verse.replace('\n', '') for verse in sanskrit_verses]
       
        result = ''.join(sanskrit_verses_without_newlines)

        return Response(result)

class SanBGVerse(APIView):
    def get_verse_data(self, api_url, api_key):
        headers = {
            'X-RapidAPI-Key': api_key,
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
    
class BGKeywordSearch(APIView):
    def get(self, request, keyword):
        if keyword:
            passages = Passages.objects.filter(
                Q(book="Bhagavad Gita") &
                Q(language="English") &
                Q(text__icontains=keyword)
            )

            serializer = PassagesSerializer(passages, many=True)

            return JsonResponse({'results': serializer.data}, safe=False)
        else:
            return JsonResponse({'error': 'No keyword provided'}, status=400)