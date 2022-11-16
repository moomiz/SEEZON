<template>
  <div>
    <RecommendMovie/>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'
import RecommendMovie from '@/components/RecommendMovie'

export default {
  name: 'MoviesView',
  components: {
    MovieList,
    RecommendMovie
  }
}
</script>

<style>

</style>