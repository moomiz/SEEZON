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

-> detail 60번 불러오는 문제가 있음 

=> 이유 확인했다! showModal의 속성이 true가 될 때 모든 아이템들의 showModal이 true가 되어버려서 그랬던 것. 현재 보고 있는 아이템, 즉 params의 id와 일치하는 modal만 속성을 true로 바꿔주기로 조건을 추가해주자 해결되었다.

회원 가입할 때 csrf token이없는데 postman에서는 안되는데 vue axios로 받아올 때는 받아옴 ? 왜그러지.. 

게시글 생성을 위한 article create 작성 

-> article 생성 안되던 이유는 settings.py 에서 오타가 있었기 때문...

로그아웃 기능 구현 ->logoutView를 생성해서 store에서 logout action을 구현 해 
axios post로 url을 받아온 후 header를 작성하였고, mutations에 LOGOUT을 생성하여 token 값을 null로 지정해줌

로그인, 로그 아웃 상태에 따라 router link 를 바꿔주기 위해 v-if 문을 사용해주었는데, data 함수를 사용해 초기에 store에서 getters에 있는 isLogin 상태에 따라 변경해주려고 했으나 실패하였음 -> 이후 computed에 넣어서 실행하였을때는 값이 바뀔때마다 인식하므로 변경 가능하여 실행 하였음.

게시글 수정 기능 구현 -> router link를 이용하여 수정하고 싶은 게시글에서 update 버튼을 클릭하면 articleCreateView.vue로 이동하게 구성함 
-> 이후 axios로 django에 있는 update url을 호출하여 수정하고 싶은 게시글을 가져오고 , 그 게시글의 기존에 있던 정보들을 input 창에 띄우기 위해 v-model을 사용 

게시판 디테일에서 게시글에 달린 댓글 보이도록 구현 => components를 구분해서 더 만들어줬다. 게시글 디테일에서 댓글 리스트 컴포넌트를 만들고 그 안에다가 article이 가진 comment_set을 그대로 넘겨준 다음 거기서 댓글 아이템 컴포넌트를 만들어 각각이 comment(in comments)를 갖게 하여 보여준다.

username을 볼 수 있게 하기 위해 장고에서 serializer를 수정했다.

이후 댓글 생성을 위해 댓글 생성 폼 컴포넌트를 만든 뒤 input 칸을 만들어주고 submit이벤트가 발생하면 새로고침을 막은 다음 actions의 댓글 생성 axios를 실행하게 한다. 이에 맞춰 장고에서도 댓글 생성이 가능하게 하는 url과 view 함수를 만들어준다.

댓글 작성에는 성공!

read_only_fields에 user와 article을 넣어주는 것도 잊지 말자.

댓글 작성이 성공적으로 기능하면 article detail로 돌아가게 된다.

-----

작성한 댓글의 수정 기능을 구현해본다. 수정 버튼을 만들고 해당 버튼을 누르면 댓글 수정이 가능한 input 창이 v-if를 통해 랜더된다.

그 후 거기서 submit이벤트가 발생하면 새로고침이 prevent되고 axios요청을 통해 장고에서 DB를 수정한다.

그 다음 구현한 것은 게시글 좋아요 버튼.  현재 좋아요 상태인지 아닌지를 확인해서 버튼 상태를 달리 해주는데, 문제는 여기에서 axios요청을 하고 그 답에 따라 화면 랜더링을 실시간으로 수정하려 하니 axios는 비동기 요청이라 직후 랜더링을 바꾸게 하면 우리가 원하는대로 이루어지지 않는 경우가 생겼다.

이에 따라 좋아요의 경우 바로 랜더링하는 대신 현재 값 true false만 실시간으로 바뀌게 하여 그에 따른 랜더링을 하게 해주었다.

좋아요 한 사람의 수 또한 현재 좋아요 여부에 따라 총 숫자를 가져온 뒤 버튼을 누르는 것에 맞춰 +1이 되거나 -1이 되게 하는 식으로 임의로 숫자를 맞춰주었다.

즉, 데이터 베이스와 현재 랜더링 상태는 같게 유지되지만 현재 페이지 내에서 받았던 최초 정보에는 변함이 없는 상태가 된다.



이후 팔로잉 팔로워도 같은 방식으로 구현했다.



댓글의 좋아요를 구현 중이며, 개인적으로는 modal이 새로고침 이후에도 router에 따라 잘 떠있을 수 있도록 v-if를 걸어 약간의 손을 보았다.