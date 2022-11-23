<template>
  <div class="detail">
    <div class="title">
      <h3 class="m-3">{{ movie?.title }}</h3>
      <div>
        <span class="mx-3" v-if="isIn" @click="movieLike">💖</span>
        <span class="mx-3" v-if="!isIn" @click="movieLike">🤍</span>
        <span>{{ movieLikeUsers }}</span>
        <router-link to="../">[BACK]</router-link>
      </div>
    </div>
    <div>
      <img :src="`https://www.themoviedb.org/t/p/w500/${movie?.poster_path}`" :alt="movie?.title">
      <p>{{ movie?.overview }}</p>
      <p v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</p>
    </div>
    <MovieReview :reviews=reviews 
      @new-review="reviewAdd"
    />
    <hr>
    <MovieArticle :articles=articles />
    <router-link :to="{ name: 'movierelatedarticle', params: { id: movie.id } }">[NEW ARTICLE]</router-link>
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
      isIn: false,
      movieLikeUsers: 0,
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
  },
  created(){
    this.getMovieDetail()
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
  background: rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail {
  color: #2c3e50;
}
</style>