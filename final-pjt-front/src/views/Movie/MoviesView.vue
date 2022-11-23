<template>
  <div>
    <MovieSearchBar/>
    <div>
      <h3>오늘의 추천 영화</h3>
      <RecommendMovie
      :movies=todayRecommend />
    </div>
    <div v-if="isLogin">
      <h3>{{ username }}님을 위한 추천 영화</h3>
      <RecommendMovie
      :movies=forUser />      
    </div>
    <div>
      <h3>최근 뜨는 작품</h3>
      <RecommendMovie
      :movies=recent />
    </div>
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList'
import RecommendMovie from '@/components/Recommend/RecommendMovie';
import MovieSearchBar from '@/components/Movie/MovieSearchBar';
import axios from 'axios';

export default {
  name: 'MoviesView',
  data() {
    return {
      todayRecommend: null,
      forUser: null,
      recent: null,
    }
  },
  components: {
    MovieList,
    RecommendMovie, 
    MovieSearchBar,
  },
  methods: {
    todayRecommendMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/',
      }).then((res)=>{
        this.todayRecommend = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    forUserMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/',
      }).then((res)=>{
        this.forUser = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    recentMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/',
      }).then((res)=>{
        this.recent = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    username() {
      return this.$store.state.username
    },
  },
  created() {
    this.todayRecommendMovies()
    if (this.$store.getters.isLogin === true) {
      this.forUserMovies()
    }
    this.recentMovies()
  }
}
</script>

<style>


</style>