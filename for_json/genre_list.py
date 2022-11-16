import requests
import sys
import json
# sys.stdout = open('genre.txt', 'a', encoding="UTF-8")

API_KEY = 'b14cb17de1b34778b03a2b4bf1f9bf07'
# ?api_key=<<api_key>>&language=en-US
genre_payload = {'api_key': API_KEY, 'language': 'ko-KR'}
Movie_URL = 'https://api.themoviedb.org/3/genre/movie/list'
genres = requests.get(Movie_URL, params=genre_payload)
result = []
genre_lst = genres.json()['genres']
for genre in genre_lst:
    temp = {
        'model': 'movies.genre',
        'pk': genre['id'],
        'fields': {
            'name' : genre['name']
        }
    }
    result.append(temp)
with open('genre_lst.json', 'a', encoding="UTF-8") as make_file:
    json.dump(result, make_file,  ensure_ascii=False, indent='\t')