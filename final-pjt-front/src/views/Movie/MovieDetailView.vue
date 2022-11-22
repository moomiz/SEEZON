<template>
  <div>
    <div class="title">
      <h3 class="m-3">{{ movie?.title }}</h3>
      <router-link to="../">[BACK]</router-link>
    </div>
    <div>
      <img :src="`https://www.themoviedb.org/t/p/w500/${movie?.poster_path}`" :alt="movie?.title">
      <p>{{ movie?.overview }}</p>
    </div>
    <MovieReview :reviews=reviews />
    <hr>
    <MovieArticle :articles=articles />
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
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.$route.params.id}/`,
      }).then((res)=>{
        this.movie = res.data
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
    }
  },
  created(){
    this.getMovieDetail()
    console.log('왜이러는거지')
    this.getMovieReview()
    this.getMovieArticle()
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
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>