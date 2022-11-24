<template>
  <div style="width: 100%; min-height: 100vh;">
    <div class="articleBack" >
      <div class="w-50">
        <header>
          <router-link style="text-decoration-line: none; color:palevioletred" to="."><h1>⬅</h1></router-link>
          <div class="upde">
          <router-link style="text-decoration-line: none; padding-right: 5px; " :to="{ name: 'articleupdate' }" ><button class="b" >수정</button></router-link>
          <a style="text-decoration-line: none; " href="#" @click="deleteArticle"><button class="b">삭제</button></a>
        </div>
        </header>
        <hr>
        <div class="articleTitle">{{ article?.title }}
          <span class="likeUser">{{ articleLikeUsers }}</span>
        <!-- {{ article?.like_users }} -->
        <span v-if="isIn" @click="articleLike">💖</span>
        <span v-if="!isIn" @click="articleLike">🤍</span>
        </div>
        <hr>
        <p class="articleContent">{{ article?.content }}</p>
        <hr>
        <CommentCreateForm class="commentForm"
        @new-comment="commetAdd" />
        <hr>
        <ArticleCommentList class="articleCommentList" :comments=article?.comment_set />
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
  min-height: 100vh;
  background-color: black;

}
header{
  display: flex;
  text-decoration-line: none ;
  text-align: center;
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
  display: flex;
  text-align:start ;
  height:30%;
  padding-top:30px;
  padding-bottom:30px;
}
.commentForm{
  text-align:start ;
}
.articleCommentList{
  text-align:start ;
}
.b{
  font-size:15px;
  border-radius: 10px;
  background-color: transparent;
  color:palevioletred;
  border-color:palevioletred;
}

</style>