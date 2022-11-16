from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import MovieSerializer, GenreSerializer, ReviewSerializer
from .models import Genre, Movie, Review

# Create your views here.
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, pk):
    movie = get_object_or_404(Movie, id=pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)