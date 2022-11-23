<template>
  <div>
    <h3>오늘의 추천 영화</h3>
    <MovieSearchBar/>
    <RecommendMovie/>
    <h3>좋아요 기반 추천 영화</h3>
    <RecommendMovie/>
    <h3>최근 뜨는 작품</h3>
    <RecommendMovie/>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList'
import RecommendMovie from '@/components/Recommend/RecommendMovie.vue';
import MovieSearchBar from '@/components/Movie/MovieSearchBar';

export default {
  name: 'MoviesView',
  components: {
    MovieList,
    RecommendMovie,
    MovieSearchBar
  }
}
</script>

<style>


</style>