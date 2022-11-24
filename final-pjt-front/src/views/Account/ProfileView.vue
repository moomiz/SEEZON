<template>
  <div class="container" style="width: 100%; min-height: 100vh;">
  <main>
    <div class="row">
        <h4 class="name">{{ user?.username }}님의 프로필입니다.</h4>
        <p class="info">{{ user?.first_name }}{{ user?.last_name }}</p>
        <div v-if="user?.username!==recentUser">
          <button class="follow" v-if="!isIn" @click="userFollow" >follow</button>
          <button class="follow" v-if="isIn" @click="userFollow" >unfollow</button>
        </div>
          <div class="stats">
            <div class="stat" style="padding-right: 50px;">
              <p class="number-stat">{{ userFollowers }}</p>
              <p class="desc-stat">Followers</p>
            </div>
            <div class="stat">
              <p class="number-stat" >{{ user?.followings.length }}</p>
              <p class="desc-stat">Following</p>
            </div>
          </div>
            <button class="unregister" v-if="user?.username === recentUser" @click="withDrawal" >회원탈퇴</button>
            <hr>
            <router-link class="profileUpdate" :to="{ name: 'profile-update', params: { username: recentUser }}" v-if="user?.username === recentUser">profile 수정</router-link>
        </div>
        <div class="right">
          <ul class="nav">
            <p @click="likeMovie" :class="{clicked: likeMovieclicking}">{{ user?.username }}님이 좋아하는 영화</p>
            <p @click="reviewMovie" :class="{clicked: reviewMovieclicking}">{{ user?.username }}님이 리뷰를 쓴 영화</p>
            <p @click="writeArticle" :class="{clicked: writeArticleclicking}">{{ user?.username }}님이 작성하신 게시글</p>
            <p @click="likeArticle" :class="{clicked: likeArticleclicking}">{{ user?.username }}님이 좋아요 한 게시글</p>
            <p @click="writeComment" :class="{clicked: writeCommentclicking}">{{ user?.username }}님이 작성하신 댓글</p>
            <p @click="likeComment" :class="{clicked: likeCommentclicking}">{{ user?.username }}님이 좋아요 한 댓글</p>
          </ul>
          
        </div>
        <div class="middle">
        </div>
      </main>
      <div class="profileArticle">
        <ProfileList
        :list=list 
        :page-name=pageName
        :is-what=isWhat />
      </div>

    <!-- <p v-for="movie in user?.like_movies" :key="movie.id"><router-link :to="{ name: 'moviedetailpage', params: { id: movie.id } }">{{ movie?.title }}</router-link></p>
    <hr>
    <h3>{{ user?.username }}님이 작성하신 게시글</h3>
    <p v-for="article in user?.article_set" :key="article.id"><router-link :to="{ name: 'articledetail', params: { id: article.id } }">{{ article?.title }}</router-link></p>
    <hr>
    <h3>{{ user?.username }}님이 좋아요 한 게시글</h3>
    <p v-for="article in user?.like_articles" :key="article.id"><router-link :to="{ name: 'articledetail', params: { id: article.id } }">{{ article?.title }}</router-link></p>
    <hr>
    <h3>{{ user?.username }}님이 작성하신 댓글</h3>
    <p v-for="comment in user?.comment_set" :key="comment.id"><router-link :to="{ name: 'articledetail', params: { id: comment.article } }">{{ comment?.content }}</router-link></p>
    <hr>
    <h3>{{ user?.username }}님이 좋아요 한 댓글</h3>
    <p v-for="comment in user?.like_comments" :key="comment.id"><router-link :to="{ name: 'articledetail', params: { id: comment.article } }">{{ comment?.content }}</router-link></p> -->
  </div>
</template>

<script>
import ProfileList from '@/components/Account/ProfileList'
import axios from 'axios'
export default {
  name: 'ProfileView',
  components: {
    ProfileList,
  },
  methods: {
    withDrawal() {
      this.$store.dispatch('withDrawal')
    },
    userFollow() {
      if (this.$store.getters.isLogin === true) {
        this.$store.dispatch('userFollow', this.user.id)
        if (this.isIn) {
          this.userFollowers -= 1
        } else {
          this.userFollowers += 1
        }
        this.isIn = !this.isIn
      } else {
        alert('로그인이 필요합니다!')
      }
    },
    getUsers() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v3/detail/${this.$route.params.username}/`,
      }).then((res)=>{
        this.user = res.data
        this.isIn = this.user.followers.includes(this.$store.state.id)
        this.userFollowers = this.user.followers.length
      })
    },
    likeMovie() {
      this.list = this.user?.like_movies
      this.pageName = 'moviedetailpage'
      this.isWhat = 'movie'
      this.likeMovieclicking = true
      this.writeArticleclicking = false
      this.likeArticleclicking = false
      this.writeCommentclicking = false
      this.likeCommentclicking = false
      this.reviewMovieclicking = false
    },
    writeArticle() {
      this.list = this.user?.article_set
      this.pageName = 'articledetail'
      this.isWhat = 'article'
      this.likeMovieclicking = false
      this.writeArticleclicking = true
      this.likeArticleclicking = false
      this.writeCommentclicking = false
      this.likeCommentclicking = false
      this.reviewMovieclicking = false
    },
    likeArticle() {
      this.list = this.user?.like_articles
      this.pageName = 'articledetail'
      this.isWhat = 'article'
      this.likeMovieclicking = false
      this.writeArticleclicking = false
      this.likeArticleclicking = true
      this.writeCommentclicking = false
      this.likeCommentclicking = false
      this.reviewMovieclicking = false
    },
    writeComment() {
      this.list = this.user?.comment_set
      this.pageName = 'articledetail'
      this.isWhat = 'comment'
      this.likeMovieclicking = false
      this.writeArticleclicking = false
      this.likeArticleclicking = false
      this.writeCommentclicking = true
      this.likeCommentclicking = false
      this.reviewMovieclicking = false
    },
    likeComment() {
      this.list = this.user?.like_comments
      this.pageName = 'articledetail'
      this.isWhat = 'comment'
      this.likeMovieclicking = false
      this.writeArticleclicking = false
      this.likeArticleclicking = false
      this.writeCommentclicking = false
      this.likeCommentclicking = true
      this.reviewMovieclicking = false
    },
    reviewMovie() {
      this.list = this.user?.review_set
      this.pageName = 'moviedetailpage'
      this.isWhat = 'review'
      this.likeMovieclicking = false
      this.writeArticleclicking = false
      this.likeArticleclicking = false
      this.writeCommentclicking = false
      this.likeCommentclicking = false
      this.reviewMovieclicking = true
    },
  },
  data() {
    return {
      user: null,
      isIn: null,
      userFollowers: null,
      list: null,
      pageName: null,
      isWhat: null,
      likeMovieclicking: false,
      writeArticleclicking: false,
      likeArticleclicking: false,
      writeCommentclicking: false,
      likeCommentclicking: false,
      reviewMovieclicking: false,
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    recentUser() {
      return this.$store.state.username
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function() {
        this.getUsers()
      }
    }
  }, 
}
</script>

<style>

.clicked {
  color: rgb(255, 25, 94);
}

html,body {
  background: #efefef;
  font-family: "Arial";
}

.container {
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: black;
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
}

header {
  background: gra;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 250px;
}

header i {
  position: relative;
  cursor: pointer;
  right: -96%;
  top: 25px;
  font-size: 18px !important;
  color: #fff;
}

@media (max-width:800px) {
  header {
    height: 150px;
  } 
  
  header i {
    right: -90%;
  }
}

main {
      padding: 20px 20px 0px 20px;
      display: inline-flex;
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
}


@media (max-width:990px) {
  .active {
    right: calc(50% - 60px);
    top: 50px;
  } 
}

.name {
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18pt;
  color: #777;
}

.info {
  margin-top: -5px;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11pt;
  color: #aaa;
}

.stats {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
  font-family: 'Montserrat', sans-serif;
}


.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: #aaa;
}

.desc-stat {
  margin-top: -15px;
  font-size: 10pt;
  color: #bbb;
}

.desc {
  text-align: center;
  margin-top: 25px;
  margin: 25px 40px;
  color: #999;
  font-size: 11pt;
  font-family: 'Montserrat', sans-serif;
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
}

/* .right {
  padding: 0 25px 0 25px !important;
} */

.nav {
  display: inline-flex;
}

.nav p {
  margin: 40px 30px ;
  font-size: 13pt;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #888;
}

.nav p:hover{ 
  color: #999;
  border-bottom: 2px solid #999;
}

.follow {
  right: 8%;
  top: 35px;
  font-size: 11pt;
  background-color: #42b1fa;
  color: #fff;
  padding: 8px 15px;
  width: 30%;
  cursor: pointer;
  transition: all .4s;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  border: transparent
}

.follow:hover {
  box-shadow: 0 0 15px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.2);
}

@media (max-width:990px) {
  .nav {
    display: none;
  }
  
  .follow {
    width: 50%;
    margin-left: 25%;
    display: block;
    position: unset;
    text-align: center;
  }
}
.gallery  {
  margin-top: 35px;
}

.gallery div {
  margin-bottom: 30px;
}

.gallery img {
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
  width: auto; 
  height: auto;
  cursor: pointer;
  max-width: 100%;
}
.profileArticle{
  display: flex;
  justify-content: center;
  padding-top: 10%;
}
.row{
  margin:10px
}
.unregister{
  right: 8%;
  top: 35px;
  font-size: 11pt;
  background-color: #8842fa;
  color: #fff;
  padding: 8px 15px;
  width: 30%;
  cursor: pointer;
  transition: all .4s;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  border: transparent;
  height: 40px;
}
.profileUpdate{
  right: 8%;
  top: 35px;
  font-size: 11pt;
  background-color: #fa42e4;
  color: #fff;
  padding: 8px 15px;
  width: 30%;
  cursor: pointer;
  transition: all .4s;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  border: transparent;
  text-decoration-line: none;
  height: 40px;
}

</style>