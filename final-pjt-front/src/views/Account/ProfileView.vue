<template>
  <div style="width: 100%; min-height: 100vh;">
    <p>{{ user?.username }}님의 프로필입니다.</p>
    <div v-if="user?.username!==recentUser">
      <button class="follow" v-if="!isIn" @click="userFollow" >follow</button>
      <button class="follow" v-if="isIn" @click="userFollow" >unfollow</button>
    </div>
    <p>팔로워: {{ userFollowers }}</p>
    <p>팔로잉: {{ user?.followings.length }}</p>
    <p>first name : {{ user?.first_name }}</p>
    <p>last name : {{ user?.last_name }}</p>
    <button v-if="user?.username === recentUser" @click="withDrawal" >회원탈퇴</button>
    <router-link :to="{ name: 'profile-update', params: { username: recentUser }}" v-if="user?.username === recentUser">회원 정보 수정</router-link>
    <hr>
    <h3><span @click="likeMovie" :class="{clicked: likeMovieclicking}">{{ user?.username }}님이 좋아하는 영화</span> | <span @click="reviewMovie" :class="{clicked: reviewMovieclicking}">{{ user?.username }}님이 리뷰를 쓴 영화</span><br><span @click="writeArticle" :class="{clicked: writeArticleclicking}">{{ user?.username }}님이 작성하신 게시글</span> | <span @click="likeArticle" :class="{clicked: likeArticleclicking}">{{ user?.username }}님이 좋아요 한 게시글</span><br><span @click="writeComment" :class="{clicked: writeCommentclicking}">{{ user?.username }}님이 작성하신 댓글</span> | <span @click="likeComment" :class="{clicked: likeCommentclicking}">{{ user?.username }}님이 좋아요 한 댓글</span></h3>
    
    <ProfileList
    :list=list 
    :page-name=pageName
    :is-what=isWhat />

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
.follow {
  border: 1px solid rgb(255, 25, 94);
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 25, 94);
  border-radius: 10%;
  margin-bottom: 1%;
}
.clicked {
  color: rgb(255, 25, 94);
}
</style>