# 8기 FINAL 관통 PJT

### 0. 시작하며…

##### WHO ARE WE?

SSAFY 8기 구미 2반, 9조

| 이시준     | 김민지      |
| ------- | -------- |
| 팀장      | 팀원       |
| Back 위주 | Front 위주 |

---

##### Who did...

| What    | 이시준 | 김민지 |
| ------- | --- | --- |
| 아이디어 구상 | ◎   | ◎   |
| 기본 요구사항 | ◎   | ◎   |
| 알고리즘 구상 | ◎   | ◎   |
| 알고리즘 구현 | ◎   |     |
| css 비중  | ↓   | ↑   |
| PPT     |     | ◎   |

기본 골조는 둘이서 함께 작업했습니다. 드라이버와 네비게이터로 번갈아가며 작업 후 어느정도 형태가 완성된 다음 백 위주, 프론트 위주로 나뉘어 추가로 진행을 하였습니다.



css에 있어서는 각자 맡은 페이지가 다릅니다.

---

### 1. 필요 데이터 받아오기

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



##### USE VUE...

Django REST Framework & Vue를 통한 프로젝트 구현을 하기로 결정. 그에 따라 필요 router / components 대략적 분리.



=> 잘 돌아가는지 확인하기 위해 장고와 뷰의 서버를 키고 axios 요청 실행

=> cors headers 문제로 django에서 관련 pip install.



=> 해결 후 component 마저 진행.

router로 이동하는 화면의 경우 views 폴더에. 그 외의 것은 components 폴더에서 작업.



페이지가 많아지니 views / components에 하위 폴더를 만들어 진행하는 것이 더 보기에 좋은 것 같아 해당 부분도 수정하게 되었음

---

대략적인 페이지 나누기 이후...

##### 아이디어 구상...

영화 DB를 장고에서 관리한다면 즉, 실시간으로 현재 유행하는 영화를 찾아주기 힘든 시점이 올 것.(계속 API를 돌리면 가능하겠지만...)

그렇다면 애초부터 그 사실을 염두에 둔 아이디어로 프로젝트를 진행하자.



1. 최신 영화는 영화관에서 볼 수 있겠지만, 아니라면 현재 어디서 볼 수 있는지 정보가 필요하다.

2. 왜 우리 사이트를 써야 하는가? 사람들은 무엇에서 만족감을 얻는가?

3. 세상에는 이미 많은 영화 추천 사이트가 있고, 영화 추천 사이트가 아닌 곳마저 밥먹듯이 영화 추천을 한다. 그렇다면 단순히 추천만을 컨셉으로 잡아서는 아쉬움이 남지 않을까.



=> 커뮤니티를 중심으로, 오늘 함께 영화를 볼 수 있는 사람을 구할 사이트를 만들자.(in online)



그렇다면 영화 추천은 어떤 식이 되어야 할까.

- 좋아하는 사람이 많은 영화

- 사람들 사이에서 입소문으로 핫한! 영화

- 내가 관심있어하는 것 위주의 영화



이에 따른 알고리즘을 만들어내길 구상하며, 예상되는 모델 생성 작업을 진행.

완성된 ERD는 다음의 이미지와 같다.

---

##### Model의 구성, ERD...

![loading-ag-1349](README_assets/6291e0d28ae4869d459878fe63aadf7448c3f56f.png)

(이미지가 너무 커서 첨부가 안되었다면 같은 폴더에 위치한 타 파일 확인!)



유저는 영화/리뷰/게시글/댓글에 좋아요를 할 수 있고 다른 사람을 팔로우 할 수 있다.

영화에는 리뷰를 달 수 있고 좋아요를 할 수 있고 관련된 게시글을 열람/작성할 수 있다.

리뷰는 영화마다 달 수 있다. 좋아요 가능.

게시글은 자유로운 글과 영화 관련 글을 쓸 수 있게 구성. 좋아요 가능.

댓글은 게시글마다 달기 가능. 마찬가지로 여기도 좋아요 가능.



역참조 가능 대상에 유의하자.

---

##### 어디까지? ...

떠올린 아이디어에 맞추어 구현을 시작했다. 그렇다면 우리는 상상과 현실 사이의 괴리를 얼마나 좁혀냈을까...



우선 구현 과정을 설명한 뒤 이어가겠다.



첫 화면에서 할 수 있는 것은, 추천 영화 확인과 영화의 조회.

조회 시detial 페이지를 router가 변화하는 모달로 바꾸어 확인하고자 함.



이때 modal을 보여주는 조건이, router와 movie id가 일치할 시 해당 movie item의 modal(in router view)을 활성화 시키는 것으로 진행.



하지만 화면에 당장 보이는 영화가 아니라면 오류가 날 가능성이 있어 추천 영화는 modal 대신 detial page view로 넘어가도록 구상.



다음, 게시글 화면에서는 게시글 리스트를 확인 할 수 있다. 관련된 영화 제목과, 글 제목, 글을 좋아하는 사람 수, 글 생성일. 글 생성도 가능!

최근 작성된 글이 제일 위에 오도록 django에서 불러올 적에 -pk로 order_by를 주었다.



이후 게시글 디테일 화면에 들어가면, 게시글의 제목, 본문을 확인 할 수 있고, 아래에 댓글도 달 수 있게 구현했다.



댓글에도 좋아요 가능하다!



영화에 좋아요를 하고 리뷰를 쓰고 글을 쓰고 댓글을 썼다면, 이제 프로필을 만들어봐야겠다 싶었다. 



내 정보를 보여주고,  다른 사람을 팔로우 할 수 있고, 내가 쓴 글과 댓글 그리고 리뷰를 조회할 수 있고, 좋아요 한 것도 조회할 수 있고... 그렇게 구현했다.



이후 글 작성이나 수정, 팔로우 등은 로그인 한 사용자만 작성할 수 있고, 본인이 한 것만 수정할 수 있게 제한을 걸어주었다.



여기까지가 대략의 뼈대였고...



##### 그간의 고군분투...(과거형)

detail 페이지를 modal로 바꾸어 구현해볼 예정.

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

->성인인증이 필요해서 is_ault = null 값 부여 Article 모의 데이터 작성

-> article ,like_user가 없을 때 글이 생성 되지 않는 문제점을 발견하여 null =True , blank = True 를 작성하여 모델 수정 함

-> Foreginkey에서는 null값이 의미를 가지지만 manytomany에서는 null 은 의미를 가지지 않아 black = True 만 작성

vue 에서 django에서 생성한 Article 목록을 보여주기위해 axios로 게시판 url을 가져온 후 Article view에 출력

Article 상세 목록을 보기 위해 마찬가지로 axios 로 article detail 불러옴

Movie Detail을 영화 이미지를 클릭 하였을 때 modal 창으로 띄우기 위해서 v-if문과 watch를 사용하여 showModal일 경우 router index에 있는 메타 필드에 shoModal 띄운다

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

작성한 댓글의 수정 기능을 구현해본다. 수정 버튼을 만들고 해당 버튼을 누르면 댓글 수정이 가능한 input 창이 v-if를 통해 랜더된다.

그 후 거기서 submit이벤트가 발생하면 새로고침이 prevent되고 axios요청을 통해 장고에서 DB를 수정한다.

그 다음 구현한 것은 게시글 좋아요 버튼. 현재 좋아요 상태인지 아닌지를 확인해서 버튼 상태를 달리 해주는데, 문제는 여기에서 axios요청을 하고 그 답에 따라 화면 랜더링을 실시간으로 수정하려 하니 axios는 비동기 요청이라 직후 랜더링을 바꾸게 하면 우리가 원하는대로 이루어지지 않는 경우가 생겼다.

이에 따라 좋아요의 경우 바로 랜더링하는 대신 현재 값 true false만 실시간으로 바뀌게 하여 그에 따른 랜더링을 하게 해주었다.

좋아요 한 사람의 수 또한 현재 좋아요 여부에 따라 총 숫자를 가져온 뒤 버튼을 누르는 것에 맞춰 +1이 되거나 -1이 되게 하는 식으로 임의로 숫자를 맞춰주었다.

즉, 데이터 베이스와 현재 랜더링 상태는 같게 유지되지만 현재 페이지 내에서 받았던 최초 정보에는 변함이 없는 상태가 된다.

이후 팔로잉 팔로워도 같은 방식으로 구현했다.

댓글의 좋아요를 구현 중이며, 개인적으로는 modal이 새로고침 이후에도 router에 따라 잘 떠있을 수 있도록 v-if를 걸어 약간의 손을 보았다.

---

##### 등의 과정을 거쳐 기본 뼈대를 완성하고 나면,

### 영화 추천 알고리즘

을 설명할 시간이 왔다.

##### 1번.

로그인하지 않아도 보이는 추천 창.

좋아요 한 사람이 있는 영화만을 골라 랜덤으로 추천을 해준다. 누군가의 취향이, 사용자의 취향과 꼭 맞기를 바란 이 알고리즘에는 django에서 오브젝트를 가져올 때에 filter로 like_users__isnull=Flase를 통해 걸러주는 것으로 해냈다.



##### 2번.

로그인을 해야 볼 수 있는 창.

거기에다, 좋아요 한 영화가 있으면 더 유용하게 작동한다.

가장 최근에 좋아요 한 영화를 state에 저장해두고, 해당 장르 기반으로 장고에 데이터를 요청하여 영화를 추천받을 수 있다.

장고에서 영화를 받아오는데, 우리가 보낸 장르 아이디와 일치하는 장르를 가진 영화를 filter로 걸러 가져오는 것으로 구현했다.

장르 목록이 여러개일 때 어떻게 데이터를 django로 보내주어야 할지 고민했는데, POST 요청을 쓰는 것으로 해결했다. request.data에 정보가 담길테니까.



##### 3번.

로그인 하지 않아도 볼 수 있는 창.

좋아요 한 사람이 없는 영화만 추천된다. filter에서 like_users_isnull=True만 가져왔다. 여기에 있는 영화는 TMDB에서 가져온 것인데, 그중에서도 고평점 영화로 받아왔으니 이 사이트의 사람들이 좋아하지 않았다 해도 분명 그건 아직일 뿐, 누군가는 여기서도 운명을 찾을 수 있을 것이다.



##### 4번

비장의 추천 알고리즘. 로그인 하지 않아도 볼 수 있는 창.

최근에 관련 게시글이 올라온 영화가 가장 앞에 오도록 정리되어 추천된다.

이 구현은 movie의 article_set이 비지 않은 것을 가져와서, distinct로 중복을 제거한 다음 뷰로 가져온다.

그리고 뷰에서 movie의 article_set의 (serializer를 통해 상세 정보 모두 확인 가능) 내용을 통해 그 안의 게시글 중 가장 마지막에 있는 것의 최초 작성 시간을 확인한다.

가장 마지막 게시글은 article_set[article_set.length - 1]로 찾을 수 있었고, 최초 작성 시간의 비교는 sort 함수에 compare를 하여 정렬했다.

문자열 역시 크기 비교가 가능하기 때문에 할 수 있는 추천 방식이었다.

---

#### 비장인 이유는...

최신 영화보다 꽤 이전의 영화가 더 많은 DB, 그 속에서 보석을 찾으면 누군가와 공유하고 싶지 않을까.

남이 찾은 보석을 나도 함께 공유받고 싶지 않을까.

그런 상상으로 만들어낸 알고리즘이고, 그런 상상으로 구현한 웹페이지이다. 함께 볼 사람을 용이하게 구할 수 있도록 movie의 detail 페이지에서는 현재 그 영화를 서비스하는 업체를 실시간으로 받아볼 수 있도록 구현했다. TMDB에서는 그 정보도 제공하고 있길래 냉큼 api를 사용했다.

그러니 더욱 우리 사이트에서는, 사람들이 리뷰 뿐 아니라 실시간으로 올라온 게시글에 댓글을 달며 서로 영화의 감상을 공유할 수 있지 않을까 생각해본다.

---

#### 프로젝트, 그리고 1학기를 마치며...

##### 이시준

특별한 이유는 없었지만 보통 혼자서 이것저것 다 하는 원맨 플레이를 주로 해왔는데, 그렇다 보니 이번 프로젝트는 꽤 특별했습니다. 페어와 함께하는 프로젝트라니. 이전 관통 역시 페어프로그래밍이었지만, 이번이 가장 새로웠습니다. 스켈레톤 없이 1주간 진행하는 것이었으니 어쩌면 당연할 겁니다.

하지만 할 수 없는 일이었느냐 하면, 그건 아니었습니다. 생각보다는 할만했고, 또 욕심나는 시간이었습니다. 조금만 더 손을 대면 훨씬 괜찮은 결과가 나오지 않을까. 다만 그런 생각에 사소한 것에 시간을 쏟느라 전체적으로는 아쉬운 부분도 조금 있었던 것 같아 이후에는 시간 분배에 대해서도 고민을 해봐야겠다 하나 더 배울 수 있었습니다.

그렇게, 코딩의 ㅋ도 모르고 개발의 ㄱ도 모르던 제가 이 시간을 거쳐 무언가 해낸 사람이 되었습니다. 이 기쁨과 영광을 우리 페어 민지에게, 그리고 저희에게 많은 가르침을 주신 교수님께, 프로님들께 바칩니다. 감사합니다.

1학기 감사했습니다!



##### 김민지

최종 관통 프로젝트를 진행하면서 saffy에서 약 4개월 동안 배운 것을 총 동원하여 하나의 웹사이트를 구성하였는데 매주 시험 칠 때와 다르게 모르는 것이 많다고 느껴졌지만 페이와 협동하면서 하다보니 제 부족한 점을 많이 보안 할 수 있었고 진행하면서 생기는 여러가지 어려운 점을 해결하면서 한 층 성장 할 수 있는 프로젝트였다고 생각합니다. 

저랑 함께 해준 시준 언니에게 너무 고맙고, 어려울 때마다 알려주시고 도와 주신 교수님께도 정말 감사합니다.