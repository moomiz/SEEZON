<template>
  <div style="width: 100%; min-height: 100vh;">
    <div class="articleBack" >
      <div class="w-50">
        <header class="articleDetailHeader">
          <router-link style="text-decoration-line: none; color:palevioletred" to="."><h4>X</h4></router-link>
          <div class="upde">
          <span class="mx-5">{{ article?.username }}</span>
          <router-link style="text-decoration-line: none; padding-right: 5px;" class="hoverpink" :to="{ name: 'articleupdate' }" >수정</router-link>
          <a style="text-decoration-line: none;" class="hoverpink" href="#" @click="deleteArticle">삭제</a>
          </div>
        </header>
        <hr>
        <div class="articleTitle">
        <span><h4>{{ article?.title }}</h4></span>
        <span class="likeUser">{{ articleLikeUsers }}</span>
        <!-- {{ article?.like_users }} -->
        <span class="heart" v-if="isIn" @click="articleLike"><h5>💖</h5></span>
        <span class="heart" v-if="!isIn" @click="articleLike"><h5>🤍</h5></span>
        </div>
        <hr>
        <p class="articleContent" style="white-space:pre-line;">{{ article?.content }}</p>
        <hr>
        <CommentCreateForm class="commentForm"
        @new-comment="commetAdd" />
        <hr>
        <ArticleCommentList class="articleCommentList mb-4" :comments=article?.comment_set />
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import ArticleCommentList from '@/components/Article/ArticleCommentList'
import CommentCreateForm from '@/components/Article/CommentCreateForm'

export default {
  name: 'ArticleDetailView',
  components: {
    ArticleCommentList,
    CommentCreateForm,
  },
  data() {
    return {
      article: null,
      isIn: false,
      articleLikeUsers: 0,
    }
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v2/articles/${this.$route.params.id}/`
      }).then((res)=>{
        this.article = res.data
        this.isIn = this.article.like_users.includes(this.$store.state.id)
        this.articleLikeUsers = this.article.like_users.length
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    deleteArticle() {
      if (this.$store.getters.isLogin === true) {
        if (this.$store.state.username === this.article.username) {
          this.$store.dispatch('deleteArticle', this.$route.params.id)
        } else {
          alert(`${this.$store.state.username}님의 글이 아닙니다!`)
        }
      } else {
        alert('로그인이 필요합니다!')
      }
    },
    articleLike() {
      if (this.$store.getters.isLogin === true) {
        this.$store.dispatch('articleLike', this.article.id)
        if (this.isIn) {
          this.articleLikeUsers -= 1
        } else {
          this.articleLikeUsers += 1
        }
        this.isIn = !this.isIn
      } else {
        alert('로그인이 필요합니다!')
      }
    },
    commetAdd() {
      this.getArticleDetail()
    }
  },
  created(){
    this.getArticleDetail()
  },
}
</script>

<style>
.articleBack{
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: black;
  font-size: 15px
}
.articleDetailHeader{
  display: flex;
  text-decoration-line: none ;
  text-align: center;
  height: 15px;
}
.upde{
  margin-left: auto;
}
.articleTitle {
  display: flex;
  margin-right: auto ;
  background-color:black;
}
.likeUser{
  margin-left: auto;
}
.articleContent{
  font-size: 20px;
  word-break: break-all;
  display: flex;
  text-align:start ;
  padding:20px;
  min-height: 300px;
}
.commentForm{
  text-align:start ;
}
.articleCommentList{
  text-align:start ;
}
.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
.heart:hover{
  filter:alpha(opacity=70);
  opacity:.7;
  filter:alpha(opacity=100);
  opacity:1;
  -ms-transform:rotate(10deg);
  -webkit-transform:rotate(10deg);
  transform:rotate(10deg);
  transition:opacity .3s;
  -webkit-transition:opacity .3s;transition:opacity .3s;
  }
</style>