<template>
  <div>
    <RecommendMovie/>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList'
import RecommendMovie from '@/components/Recommend/RecommendMovie'

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