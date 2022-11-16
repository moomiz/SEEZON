# 8기 FINAL 관통 PJT

#### 0. 시작하며…

TMDB api를 통해 받아온 응답을 수정하여 필요한 것만 고르기

기본 데이터 fixtures를 django에 저장

1. 장르명

```python
import requests
import sys
import json
# sys.stdout = open('genre.txt', 'a', encoding="UTF-8")

API_KEY = '####'
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
```

2. 영화 목록

```python
import requests
from pprint import pprint
import sys
import json
# sys.stdout = open('movie.txt', 'a', encoding="UTF-8")

API_KEY = '####'
movie_payload = {'api_key': API_KEY, 'language': 'ko-KR', 'page': 1}
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
```

관련 정보를 장고로부터 받아올 수 있도록 serializers, views, urls 구성

필요 router / components 대략적 분리



=> 잘 돌아가는지 확인하기 위해 장고와 뷰의 서버를 키고 axios 요청 실행

=> cors headers 문제로 django에서 관련 pip install.