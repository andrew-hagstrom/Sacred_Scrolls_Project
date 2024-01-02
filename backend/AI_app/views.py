import requests
from openai import OpenAI
import re
from user_app.models import Favorites
from rest_framework import serializers
from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from sacred_scrolls_proj.settings import env  
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)

class VerseAnalysis(APIView):
    pass

class WordAnalysis(APIView):

    def get(self, request, word):
        api_key = env.get('OPENAI_API_KEY')
        
        client = OpenAI(api_key=api_key)
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a ancient languages morphological assistant for the Bible(in Greek and Hebrew), the Quran(in Arabic), and the Bhagavad-Gita(in Sanskrit)."},
                    {"role": "user", "content": f"Provide the translation and transliteration of the following word: {word}."}
                ]
            )
        print(response.json())
        return Response(response, status=HTTP_200_OK)
        

    def post(self, request, word):
        favorites= Favorites.objects.get(user=request.user)
        new_favorite = GreekWord(word=word, morphology=request.data.get('morphology'), word_bank=wordbank)
        new_wordbank_word.save()
        return Response(f'{new_wordbank_word} has been added to your word bank', status=HTTP_201_CREATED)
    

    def delete(self, request, word):
        wordbank= WordBank.objects.get(user=request.user)
        wordbank_word = GreekWord.objects.get(word=word, word_bank=wordbank)
        wordbank_word.delete()
        return Response('{new_wordbank_word} has been deleted from your word bank', status=HTTP_204_NO_CONTENT)
