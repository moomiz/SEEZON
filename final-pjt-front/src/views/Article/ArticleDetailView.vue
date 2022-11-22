<template>
  <div>
    <hr>
    <h3>{{ article?.title }}</h3>
    <span>{{ articleLikeUsers }}
    <!-- {{ article?.like_users }} -->
    <button v-if="isIn" @click="articleLike">♥</button>
    <button v-if="!isIn" @click="articleLike">♡</button></span>
    <br>
    <router-link :to="{ name: 'articleupdate' }" >[UPDATE]</router-link>
    <p>{{ article?.content }}</p>
    <button @click="deleteArticle">[DELETE]</button>
    <hr>
    <CommentCreateForm 
    @new-comment="commetAdd" />
    <hr>
    <ArticleCommentList :comments=article?.comment_set />
    <hr>
    <router-link to=".">[BACK]</router-link>
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
        this.$store.dispatch('deleteArticle', this.$route.params.id)
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