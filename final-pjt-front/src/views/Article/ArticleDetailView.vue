<template>
  <div class="d-flex justify-content-center" style="width: 100%; min-height: 100vh;">
    <div class="w-75">
      <hr>
      <h3>{{ article?.title }}</h3>
      <span>{{ articleLikeUsers }}</span>
      <!-- {{ article?.like_users }} -->
      <span v-if="isIn" @click="articleLike">💖</span>
      <span v-if="!isIn" @click="articleLike">🤍</span>
      <br>
      <div class="justify-content-between">
        <router-link :to="{ name: 'articleupdate' }" >[UPDATE]</router-link>
        <a href="#" @click="deleteArticle">[DELETE]</a>
      </div>
      <p>{{ article?.content }}</p>
      <hr>
      <CommentCreateForm 
      @new-comment="commetAdd" />
      <hr>
      <ArticleCommentList :comments=article?.comment_set />
      <router-link to=".">[BACK]</router-link>
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
      isIn: null,
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

</style>