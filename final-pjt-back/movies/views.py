from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import MovieSerializer, GenreSerializer, ReviewSerializer
from django.db.models import Count
from .models import Genre, Movie, Review

# Create your views here.
@api_view(['GET'])
def genre_list(request):
    genres = get_list_or_404(Genre)
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def genre_filter(request, genre_pk):
    movies = get_list_or_404(Movie, genres=genre_pk)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def movie_like(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
    else:
        movie.like_users.add(user)
    return Response(status=status.HTTP_200_OK)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def movie_review(request, movie_pk, review_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'PUT':
        serializer = ReviewSerializer(data=request.data, instance=review)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
def movie_review_list(request, movie_pk):
    review = get_list_or_404(Review.objects.order_by('-pk'), movie=movie_pk)
    serializer = ReviewSerializer(review, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, movie=movie)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_like(request, pk):
    review = get_object_or_404(Review, pk=pk)
    user = request.user
    if review.like_users.filter(pk=user.pk).exists():
        review.like_users.remove(user)
    else:
        review.like_users.add(user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def recommend_movie_list(request):
    movies = get_list_or_404(Movie.objects.distinct(), article__movie_id__isnull=False)
    # movies.sort(key=lambda movie:movie.article_set.all()[len(movie)-1].created_at)
    # for movie in movies:
    #     print(movie.article_set.all())
    #     for article in movie.article_set.all():
    #         print(article.created_at)
    # movies.sort()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def today_recommend_movie_list(request):
    movies = get_list_or_404(Movie.objects.distinct(), like_users__isnull=False)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def nobody_recommend_movie_list(request):
    movies = get_list_or_404(Movie.objects.order_by('?'), like_users__isnull=True)[:30]
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def user_recommend_movie_list(request):
    if request.data['genres']:
        movies = get_list_or_404(Movie.objects.distinct(), genres__in=request.data['genres'])
    else:
        movies = get_list_or_404(Movie)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)