from rest_framework import serializers
from .models import Genre, Movie, Review

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'name',)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
        
class MovieSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    articles = serializers.CharField(source='article_set.all', read_only=True)
    
    class Meta:
        model = Movie
        fields = '__all__'
