<template>
  <div class="detail">
    <div class="title">
      <h3 class="m-3">{{ movie?.title }}</h3>
        <router-link style="text-decoration-line: none; color:palevioletred" :to="{ name: 'index' }"><h1>⬅</h1></router-link>
    </div>
    <div class="middle">
      <img class="moviePoster" :src="`https://www.themoviedb.org/t/p/w500/${movie?.poster_path}`" :alt="movie?.title">
      <div class="middleLeft">
        <div class="like">
          <span class="mx-3" v-if="isIn" @click="movieLike">💖</span>
          <span class="mx-3" v-if="!isIn" @click="movieLike">🤍</span>
          <span>{{ movieLikeUsers }}</span>
        </div>
        <p >{{ movie?.overview }}</p>
        <hr>
        <span v-for="genre in movie?.genres" class="px-2" :key="genre?.id">{{ genre?.name }}</span>
        <div v-if="whereCanStream">
          <hr>
          <h5>STREAMING</h5>
          <span v-for="stream in whereCanStream" :key="stream?.provider_id" class="px-1"><img class="rounded" :src="`https://www.themoviedb.org/t/p/original${stream?.logo_path}`" :alt="stream?.provider_name"></span>
        </div>
        <div v-if="whereCanRent">
          <hr>
          <h5>RENT</h5>
          <span v-for="rent in whereCanRent" :key="rent?.provider_id" class="px-1"><img class="rounded" :src="`https://www.themoviedb.org/t/p/original${rent?.logo_path}`" :alt="rent?.provider_name"></span>
        </div>
        <div v-if="whereCanBuy">
          <hr>
          <h5>BUY</h5>
          <span v-for="buy in whereCanBuy" :key="buy?.provider_id" class="px-1"><img class="rounded" :src="`https://image.tmdb.org/t/p/original${buy?.logo_path}`" :alt="buy?.provider_name"></span>
        </div>
        <hr>
        <MovieArticle :articles=articles />
        <router-link :to="{ name: 'movierelatedarticle', params: { id: movie?.id } }">[NEW ARTICLE]</router-link>
      </div>
    </div>
    <hr>
    <MovieReview class="movieReview" :reviews=reviews 
      @new-review="reviewAdd"
    />
    <!-- {{ reviews }} -->
    <!-- <div class="movie-info">
      <p>{{ movie?.title }}</p>
      <p>{{ movie?.overview }}</p>
      <p>{{ movie?.overview }}</p>
      <p>{{ movie?.overview }}</p>
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`" :alt="movie?.title">
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import MovieReview from '@/components/Movie/MovieReview'
import MovieArticle from '@/components/Movie/MovieArticle'

const API_KEY = process.env.VUE_APP_TMDB_API_KEY

export default {
  name: 'DetailView',
  components: {
    MovieReview,
    MovieArticle,
  },
  data(){
    return{
      movie: null,
      reviews: null,
      articles: null,
      isIn: false,
      movieLikeUsers: 0,
      whereCanStream: false,
      whereCanRent: false,
      whereCanBuy: false,
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.$route.params.id}/`,
      }).then((res)=>{
        this.movie = res.data
        this.isIn = this.movie.like_users.includes(this.$store.state.id)
        this.movieLikeUsers = this.movie.like_users.length
        if (this.movie.articles) {
          this.getMovieArticle()
        }
        if (this.movie.reviews) {
          this.getMovieReview()
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    getMovieReview() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.$route.params.id}/reviewlist/`,
      }).then((res)=>{
        console.log(res, '리뷰')
        this.reviews = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    getMovieArticle() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v2/movies/${this.$route.params.id}/article/`,
      }).then((res)=>{
        console.log(res, '게시글')
        this.articles = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    reviewAdd() {
      this.getMovieReview()
    },
    movieLike() {
      if (this.$store.getters.isLogin === true) {
        this.$store.dispatch('movieLike', this.movie.id)
        if (this.isIn) {
          this.movieLikeUsers -= 1
        } else {
          this.movieLikeUsers += 1
        }
        this.isIn = !this.isIn
      } else {
        alert('로그인이 필요합니다!')
      }
    },
    getWhereCan() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/watch/providers?api_key=${API_KEY}`
      }).then((res)=>{
        console.log(res.data.results.KR)
        this.whereCanStream = res.data.results.KR.flatrate
        this.whereCanRent = res.data.results.KR.rent
        this.whereCanBuy = res.data.results.KR.buy
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  created(){
    this.getMovieDetail()
    this.getWhereCan()
    console.log('왜이러는거지')
  }
}
</script>

<style>
.title {
  z-index: 999;
  position: sticky;
  top: 0;
  /* width: 100% */
  left: 0;
  right: 0;
  height: 75px;
  padding: 1rem;
  color:#2c3e50;
  background: transparent;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail {
  color: #2c3e50;
}
.like{
  padding:30px;
}
.middle{
  display: inline-flex;
  flex-direction: row;
  
}

.moviePoster {
  padding:30px;
  margin-left: 10%;

}

.middleLeft{
  padding:30px;
  margin-right: 10%;

}
.movieReview{
  padding-bottom: 5%;
}
</style>