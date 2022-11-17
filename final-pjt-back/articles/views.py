from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404

from .serializers import ArticleSerializer, CommentSerializer
from .models import Article, Comment

# Create your views here.
@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def article_detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)