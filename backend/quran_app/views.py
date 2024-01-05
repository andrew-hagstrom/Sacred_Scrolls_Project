import requests

# from django.shortcuts import render
# from django.db import models
from rest_framework.views import APIView
from rest_framework import status

# from rest_framework.response import Response
# from sacred_scrolls_proj.settings import env
from django.http import JsonResponse

languages = {
    "ar": "ar.quran-simple",
    "en": "en.sahih",
}


class QurChapterView(APIView):
    def get(self, request, QurChapterNumber, lang):
        language = languages.get(lang)
        if language is None:
            return JsonResponse(
                {
                    "message": f"You entered which {lang} is not a valid language identifier. Please use a valid one.",
                    "valid identifiers": list(languages.keys()),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        api_url = (
            f"http://api.alquran.cloud/v1/surah/{QurChapterNumber}/{languages[lang]}"
        )
        headers = {
            "Content-Type": "application/json",
        }
        try:
            response = requests.get(api_url, headers=headers)
            data = response.json()["data"]
            return JsonResponse({"data": data}, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            print(f"Error accessing API: {e}")
            return None

        # http://api.alquran.cloud/v1/surah/2/en.asad


class QurChapterVerseView(APIView):
    def get(self, request, QurChapterNumber, QurVerseNumber, lang):
        language = languages.get(lang)
        if language is None:
            return JsonResponse(
                {
                    "message": f"You entered which {lang} is not a valid language identifier. Please use a valid one.",
                    "valid identifiers": list(languages.keys()),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        api_url = f"http://api.alquran.cloud/v1/surah/{QurChapterNumber}:{QurVerseNumber}/{languages[lang]}"
        headers = {
            "Content-Type": "application/json",
        }
        try:
            response = requests.get(api_url, headers=headers)
            data = response.json()["data"]
            # Grab just the verse we need from the returned array
            verse = [
                verse
                for verse in data["ayahs"]
                if str(verse["numberInSurah"]) == QurVerseNumber
            ]
            return JsonResponse({"data": verse}, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            print(f"Error accessing API: {e}")
            return None

class QurKeywordSearchView(APIView):
    def get(self, request, lang, keyword):
        language = languages.get(lang)
        if language is None:
            return JsonResponse(
                {
                    "message": f"You entered which {lang} is not a valid language identifier. Please use a valid one.",
                    "valid identifiers": list(languages.keys()),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        print(keyword, language)
        api_url = f"http://api.alquran.cloud/v1/search/{keyword}/all/{language}"
        headers = {
            "Content-Type": "application/json",
        }
        try:
            response = requests.get(api_url, headers=headers)
            data = response.json()["data"]
            # Grab just the verse we need from the returned array
            return JsonResponse({"data": data}, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            print(f"Error accessing API: {e}")
            return None