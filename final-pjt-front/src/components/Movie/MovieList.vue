<template>
  <div class="row">
      <MovieListItem
        class="col-2"
        v-for="movie in movies"
        :key="movie.id"
        :movie=movie
        />    
  </div>
</template>

<script>
import MovieListItem from '@/components/Movie/MovieListItem'
import axios from 'axios'



export default {
  name: 'MovieList',
  components:{
    MovieListItem,
  },
  data(){
    return{
      movies: null,
    }
  },
  created() {
    axios({
        method: 'get',
        url:'http://127.0.0.1:8000/api/v1/movies/'
    })
    .then((res)=>{
        this.movies = res.data
        console.log(res)
    })
 },
}
</script>

<style>

</style>