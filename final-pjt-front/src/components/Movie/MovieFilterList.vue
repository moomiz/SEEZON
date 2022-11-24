<template>
  <div class="row justify-content-start">
    <MovieFilterItem
      v-for="movie in movies" :key="movie.id"
      :movie=movie
    />
  </div>
</template>

<script>
import MovieFilterItem from '@/components/Movie/MovieFilterItem'
import axios from 'axios'
export default {
  name: 'MovieFilterList',
  components: {
    MovieFilterItem,
  },
  props: {
    genreId: Number,
  },
  data() {
    return {
      movies: null,
    }
  },
  methods: {
    getMovies() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/filter/${this.genreId}/`
      }).then((res)=>{
        this.movies = res.data
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  watch: {
    genreId() {
      this.getMovies()
    }
  }
}
</script>

<style>

</style>