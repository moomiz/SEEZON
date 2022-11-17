<template>
  <div>
    <ArticleListItem 
      v-for="article in articles"
      :key="article.id"
      :article=article />
  </div>
</template>

<script>
import ArticleListItem from '@/components/Article/ArticleListItem';
import axios from 'axios';

export default {
    name: 'ArticleList',
    components: {
        ArticleListItem
    },
    data() {
      return {
        articles: null,
      }
    },
    methods: {
      getArticles(){
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/v2/articles/',
        }).then((res)=>{
          console.log(res)
          this.articles = res.data
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    created(){
      this.getArticles()
    }
}
</script>

<style>

</style>