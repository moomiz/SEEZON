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

MovieList.vue (Home) 에 들어갈때마다 axios로 호출 되면 비효율적이라 생각 됨 

MovieList에서 props로 MovieListItem을 불러옴

MovieView에서 영화 추천 목록을 보여주기 위해 RecommendView를 가져옴 

추천 영화를   carousel card 형태로 보여주기 위해 vue bootstrap 설치 

=> 이미지 크기가 줄어들지 않아 해결이 필요함 

MovieListItem을 클릭 했을 때 영화 상세 정보를 보여주기 위해 router-link 사용 

detail 페이지 구성 (title,overview, poster-path ...)

--------------------------------------------------------------------------- 11/16

(추천은 장고에서 랜덤으로 10개 가져오쟝) => 이후의 예정으로 장고에서 랜덤 url을 만들어 연결된 view에서 랜덤으로 가져오면 될 것 같다.

오늘은 어제 대략적으로 만들어본 무비 detail 페이지를 modal로 바꾸어 구현해볼 예정.

=> 관련 강의를 찾아 어떻게 만든 건지 공부하며 작성중. slot이 무엇인지 찾아볼 수 있게 되었다.

css의 transform에 대한 것도 찾아보고 공부중.

html의 template에 대한 것도 찾아보고 있습니다.

=> scss나 sass 등 다른 게 더 필요해서 후순위로 두고 커뮤니티 기능을 우선하기로 했습니다.

게시판에 들어갈 components 고민

- 제목 목록

- 게시판 detail

- 게시판 페이지

- 게시판 검색 기능

- 게시판 필터

- 새글 쓰기 버튼

이쯤에서 components가 너무 늘어나서 폴더를 통한 components 기능에 따른 분류

게시판 글 작성을 위해 계정 생성 

->성인인증이 필요해서 is_ault = null 값 부여 Article  모의 데이터 작성 

-> article ,like_user가 없을 때 글이 생성 되지 않는 문제점을 발견하여 null =True , blank = True 를 작성하여 모델 수정 함 

-> Foreginkey에서는 null값이 의미를 가지지만 manytomany에서는 null 은 의미를 가지지 않아 black = True 만 작성 

vue 에서 django에서 생성한 Article 목록을 보여주기위해 axios로 게시판 url을 가져온 후 Article view에 출력 

Article 상세 목록을 보기 위해 마찬가지로 axios 로 article detail 불러옴 

Movie Detail을 영화 이미지를 클릭 하였을 때  modal 창으로 띄우기 위해서 v-if문과 watch를 사용하여 showModal일 경우 router index에 있는 메타 필드에 shoModal 띄운다 

-> meta 필드 란? 네이게이션 가드처럼 url은 이동하지만 url로 뜨는 창은 막고 대신 모달창을 띄어주는 역할 같은데 맞는지 교수님한테 물어보기 !!!!!!!!!!!





=>

modal 구현에 있어 이유 모를 새로 불러오기 60번이 있었지만... 해결은 이후에 하기로 하고 우선 회원가입/로그인 기능 구현중

교재 내의 모양대로 따라함. Token 사용을 위해 state 사용하게 됨.