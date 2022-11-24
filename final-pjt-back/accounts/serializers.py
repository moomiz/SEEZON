from rest_framework import serializers
from .models import User
from movies.serializers import MovieSerializer, ReviewSerializer
from articles.serializers import ArticleSerializer, CommentSerializer

class UserSerializer(serializers.ModelSerializer):
    like_movies = MovieSerializer(many=True, read_only=True)
    like_articles = ArticleSerializer(many=True, read_only=True)
    like_comments = CommentSerializer(many=True, read_only=True)
    article_set = ArticleSerializer(many=True, read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    review_set = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'like_movies', 'like_articles', 'like_comments', 'article_set', 'comment_set', 'review_set', 'is_adult','followings','followers')
        read_only_fields = ('username', 'followings','followers', )