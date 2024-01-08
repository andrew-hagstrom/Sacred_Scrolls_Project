import requests
from django.shortcuts import render
from django.db import models
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sacred_scrolls_proj.settings import env 
from passages_app.serializers import PassagesSerializer, Passages


class EngBGChapterView(APIView):
    def get(self, request, chapter_number):
        try:
            chapter_number = int(chapter_number)

            # Filter passages by language and chapter
            passages = Passages.objects.filter(
                language="English",
                chapter=chapter_number
            )

            if passages.exists():
                # Sort the passages by verse (as a string)
                passages = sorted(passages, key=lambda x: x.verse)

                # Join the verses together into a single text
                chapter_text = ' '.join([passage.text for passage in passages])

                return Response({'chapter_text': chapter_text})
            else:
                return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)

        except ValueError:
            return Response({'error': 'Invalid chapter number'}, status=status.HTTP_400_BAD_REQUEST)
        
class EngBGVerseView(APIView):
    def get(self, request, chapter_number, verse_number):
        try:
            chapter_number = int(chapter_number)  # Parse chapter_number as int
            verse_number = str(verse_number)  # Convert verse_number to string

            # Filter passages by language, chapter, and verse
            passage = Passages.objects.filter(
                language="English",
                chapter=chapter_number,
                verse=verse_number
            ).first()  # Get the first matching passage

            if passage:
                return Response({'verse_text': passage.text})
            else:
                return Response({'error': 'Verse not found'}, status=status.HTTP_404_NOT_FOUND)

        except ValueError:
            return Response({'error': 'Invalid chapter or verse number'}, status=status.HTTP_400_BAD_REQUEST)

        
    
class SanBGChapterView(APIView):
    def get(self, request, chapter_number):
        try:
            chapter_number = int(chapter_number)  # Parse chapter_number as int

            # Filter passages by language and chapter
            passages = Passages.objects.filter(
                language="Sanskrit",
                chapter=chapter_number
            )

            if passages.exists():
                # Sort the passages by verse (as a string)
                passages = sorted(passages, key=lambda x: x.verse)

                # Join the verses together into a single text
                chapter_text = ''.join([passage.text for passage in passages])

                return Response({'chapter_text': chapter_text})
            else:
                return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)

        except ValueError:
            return Response({'error': 'Invalid chapter number'}, status=status.HTTP_400_BAD_REQUEST)

class SanBGVerseView(APIView):
    def get(self, request, chapter_number, verse_number):
        try:
            chapter_number = int(chapter_number)  # Parse chapter_number as int
            verse_number = str(verse_number)  # Convert verse_number to string

            # Filter passages by language, chapter, and verse
            passage = Passages.objects.filter(
                language="Sanskrit",
                chapter=chapter_number,
                verse=verse_number
            ).first()  # Get the first matching passage

            if passage:
                return Response({'verse_text': passage.text})
            else:
                return Response({'error': 'Verse not found'}, status=status.HTTP_404_NOT_FOUND)

        except ValueError:
            return Response({'error': 'Invalid chapter or verse number'}, status=status.HTTP_400_BAD_REQUEST)

    
class BGKeywordSearchView(APIView):
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