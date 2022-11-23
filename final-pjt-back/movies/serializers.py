from rest_framework import serializers
from .models import Genre, Movie, Review
from articles.serializers import ArticleSerializer

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'name',)


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'movie', )
        
        
class MovieSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)
    reviews = serializers.IntegerField(source='review_set.all.count', read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    articles = serializers.IntegerField(source='article_set.all.count', read_only=True)
    article_set = ArticleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = '__all__'
