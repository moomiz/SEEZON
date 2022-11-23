<template>
  <div>
    <MovieSearchBar/>
    <div>
      <h3>오늘의 추천 영화</h3>
      <RecommendMovie/>
    </div>
    <div v-if="isLogin">
      <h3>{{ username }}님을 위한 추천 영화</h3>
      <RecommendMovie/>      
    </div>
    <div>
      <h3>최근 뜨는 작품</h3>
      <RecommendMovie/>
    </div>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList'
import RecommendMovie from '@/components/Recommend/RecommendMovie';
import MovieSearchBar from '@/components/Movie/MovieSearchBar';

export default {
  name: 'MoviesView',
  components: {
    MovieList,
    RecommendMovie,
    MovieSearchBar,
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    username() {
      return this.$store.state.username
    }
  }
}
</script>

<style>


</style>