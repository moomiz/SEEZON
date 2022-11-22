<template>
  <div>
    <b-card
      :title="movie?.title "
      tag="article"
      class="mb-2"
    >
    <b-card-text class="modal-info" style="position:relative; height: 90%; overflow-y:scroll;">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`" :alt="movie?.title">
        {{ movie?.overview }}
        {{ movie?.overview }}
        {{ movie?.overview }}
        {{ movie?.overview }}
        {{ movie?.overview }}
    </b-card-text>

    <b-button to="../" variant="primary">[BACK]</b-button>
    </b-card>
    <!-- <router-link to="../">X</router-link>
    <div class="movie-info">
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
export default {
  name: 'DetailView',
  data(){
    return{
      movie: null,
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.$route.params.id}/`,
      }).then((res)=>{
        this.movie = res.data
      })
    }
  },
  created(){
    this.getMovieDetail()
    console.log('왜이러는거지')
  }
}
</script>

<style>
.modal-info {
  overflow-y: auto;
}
</style>