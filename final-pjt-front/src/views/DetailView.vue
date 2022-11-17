<template>
  <div class="movie-info">
    <router-link to="../">X</router-link>
    <p>{{ movie?.title }}</p>
    <p>{{ movie?.overview }}</p>
    <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`" :alt="movie?.title">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DetailView',
  data(){
    return{
      movie: null,
    }
  },
  created(){
    axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.$route.params.id}/`
    })
    .then((res)=>{
        this.movie = res.data
        console.log(res)
    })
  }
}
</script>

<style scoped>
</style>