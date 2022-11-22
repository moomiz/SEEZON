<template>
  <div>
    <h3>오늘의 추천 영화</h3>
    <RecommendMovie/>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList'
import RecommendMovie from '@/components/Recommend/RecommendMovie.vue';


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