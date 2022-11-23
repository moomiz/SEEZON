from rest_framework import serializers
from .models import User
from movies.serializers import MovieSerializer

class UserSerializer(serializers.ModelSerializer):
    like_movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'like_movies', 'is_adult','followings','followers')
        read_only_fields = ('username', 'followings','followers', )