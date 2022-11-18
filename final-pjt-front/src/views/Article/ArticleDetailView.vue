<template>
  <div>
    <hr>
    <h3>{{ article?.title }}</h3>
    <router-link :to="{ name: 'articleupdate' }" >[UPDATE]</router-link>
    <p>{{ article?.content }}</p>
    <hr>
    <CommentCreateForm />
    <hr>
    <ArticleCommentList :comments=article.comment_set />
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
    }
  },
  methods: {
    getArticleDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v2/articles/${ this.$route.params.id }/`
      }).then((res)=>{
        this.article = res.data
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  created(){
    this.getArticleDetail()
  }
}
</script>

<style>

</style>