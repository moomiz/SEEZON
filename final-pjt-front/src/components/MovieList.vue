<template>
  <div>
    <MovieListItem/>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'
import axios from 'axios'

export default {
  name: 'MovieList',
  components:{
    MovieListItem,
  },
  created() {
    axios({
        method: 'get',
        url:'http://127.0.0.1:8000/api/v1/movies/'
    })
    .then((res)=>{
        console.log(res)
    })
 }
}
</script>

<style>

</style>