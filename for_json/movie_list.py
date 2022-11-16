import requests
from pprint import pprint
import sys
import json
# sys.stdout = open('movie.txt', 'a', encoding="UTF-8")

API_KEY = 'b14cb17de1b34778b03a2b4bf1f9bf07'
# ?api_key=b14cb17de1b34778b03a2b4bf1f9bf07&language=ko-KR&page=1
movie_payload = {'api_key': API_KEY, 'language': 'ko-KR', 'page': 3}
Movie_URL = 'https://api.themoviedb.org/3/movie/top_rated'
movies = requests.get(Movie_URL, params=movie_payload)
result = []
movie_lst = movies.json()['results']
for movie in movie_lst:
    temp = {
        'model': 'movies.movie',
        'pk': movie['id'],
        'fields': {
            'title': movie['title'],
            'release_date': movie['release_date'],
            'popularity': movie['popularity'],
            'vote_count': movie['vote_count'],
            'vote_average': movie['vote_average'],
            'overview': movie['overview'],
            'poster_path': movie['poster_path'],
            'adult': movie['adult'],
            'genres': movie['genre_ids']
        }
    }
    result.append(temp)
with open('movie_list.json', 'a', encoding="UTF-8") as make_file:
    json.dump(result, make_file,  ensure_ascii=False, indent='\t')