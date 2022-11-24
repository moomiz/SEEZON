<template>
    <div style="width: 100%; min-height: 100vh; background-size: cover; background-position-x: center; background-position-y: center;" :style="{'background-image': `linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ), url(https://image.tmdb.org/t/p/original${backdrop})`}">
      <div class="p-5">
        <form @submit.prevent="createMovieArticle">
          <label for="title">title : </label>
          <input type="text" id="title" v-model="title"><br>
    
          <label for="content">content : </label>
          <textarea id="content" v-model="content"></textarea><br>
    
          <input type="submit" value="create">
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import _ from 'lodash'
  const API_KEY = process.env.VUE_APP_TMDB_API_KEY

  export default {
    name: 'MovieRelatedArticleCreateView',
    data() {
      return {
        title: null,
        content: null,
        backdrop: null,
      }
    },
    methods: {
      createMovieArticle() {
        if (this.$store.getters.isLogin === true) {
          const movie = this.$route.params.id
          const title = this.title
          const content = this.content
  
          const payload = {
            movie,
            title,
            content,
          }
  
          this.$store.dispatch('createMovieArticle', payload)
        } else {
            this.$router.push({ name: 'login' })
        }
      },
    },
    beforeCreate(){
      if (this.$store.getters.isLogin === false) {
        alert('로그인이 필요합니다!')
        this.$router.push({ name: 'login' })
      }
    },
    created() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/images?api_key=${API_KEY}`
      }).then((res)=>{
        this.backdrop = _.sample(res.data.backdrops).file_path
        console.log(this.backdrop)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  </script>
  
  <style>
  </style>