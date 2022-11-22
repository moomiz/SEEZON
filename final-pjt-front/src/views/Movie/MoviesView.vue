<template>
  <div>
    <RecommendMovieList />
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList'
import RecommendMovieList from '@/components/Movie/RecommendMovieList.vue';

export default {
  name: 'MoviesView',
  components: {
    MovieList,
    RecommendMovieList

  }
}
</script>

<style>

</style>