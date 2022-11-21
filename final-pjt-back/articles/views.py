from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_list_or_404, get_object_or_404

from .serializers import ArticleSerializer, CommentSerializer
from .models import Article, Comment

# Create your views here.
@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def article_detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ArticleSerializer(data=request.data, instance=article)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def comment_create(request, pk):
    article = get_object_or_404(Article,pk=pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user,article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'DELETE', 'GET'])
@permission_classes([IsAuthenticated])
def comment_detail(request, article_pk, comment_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'PUT':
        serializer = CommentSerializer(data=request.data, instance=comment)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def article_like(request,article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    user = request.user
    if article.like_users.filter(pk=user.pk).exists():
        article.like_users.remove(user)
    else:
        article.like_users.add(user)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment_like(request,comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    user = request.user
    if comment.like_users.filter(pk=user.pk).exists():
        comment.like_users.remove(user)
    else:
        comment.like_users.add(user)
    return Response(status=status.HTTP_200_OK)