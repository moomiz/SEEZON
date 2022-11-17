<template>
  <div>
    <h3>{{ article?.title }}</h3>
    <p>{{ article?.content }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleDetailView',
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