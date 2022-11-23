<template>
  <div>
    <div>
      <!-- {{  }} -->
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
      <h3>재발견의 필요성</h3>
      <RecommendMovie
      :movies=nobody />      
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
import axios from 'axios';
import _ from 'lodash'

export default {
  name: 'MoviesView',
  data() {
    return {
      todayRecommend: null,
      forUser: null,
      recent: null,
      nobody: null,
    }
  },
  components: {
    MovieList,
    RecommendMovie, 
  },
  methods: {
    todayRecommendMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/recommend/today/',
      }).then((res)=>{
        this.todayRecommend = res.data
        this.todayRecommend = _.shuffle(this.todayRecommend)
        console.log(this.todayRecommend)
      }).catch((err)=>{
        console.log(err, '투데이')
      })
    },
    nobodyMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/recommend/nobody/',
      }).then((res)=>{
        // this.todayRecommend = _.orderBy(res.data, 'like_users', 'articles', )
        this.nobody = res.data
        console.log(this.nobody)
      }).catch((err)=>{
        console.log(err, '노바디')
      })
    },
    forUserMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/recommend/nobody/',
      }).then((res)=>{
        // this.todayRecommend = _.orderBy(res.data, 'like_users', 'articles', )
        this.nobody = res.data
        console.log(this.nobody)
      }).catch((err)=>{
        console.log(err, '포유저')
      })
    },
    recentMovies() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/movies/recommend/',
      }).then((res)=>{
        // this.todayRecommend = _.orderBy(res.data, 'like_users', 'articles', )
        this.recent = res.data
        this.recent.sort(function compare(a, b) {
          let x = a.article_set[a.articles - 1].created_at, y = b.article_set[b.articles - 1].created_at
          if (x > y) return -1
          if (x < y) return 1
          return 0
          // return y - x
        })
        // this.recent.sort()
        console.log(this.recent)
      }).catch((err)=>{
        console.log(err, '최근')
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
    this.nobodyMovies()
  }
}
</script>

<style>


</style>