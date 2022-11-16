<template>
  <div>
    <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    controls
    indicators
    img-width="1024"
    img-height="480"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
    >
    <RecommendMovieItem
      v-for="movie in movies"
      :key="movie.id"
      :movie=movie />
    </b-carousel>   
  </div>
</template>

<script>
import RecommendMovieItem from '@/components/RecommendMovieItem'
import axios from 'axios'

export default {
  name: 'RecommendMovie',
  components: {
    RecommendMovieItem,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      movies: null,
    }
  },
  methods: {
    onSlideStart(slide) {
      console.log(slide)
      this.sliding = true
    },
    onSlideEnd(slide) {
      console.log(slide)
      this.sliding = false
    }
  },
  created() {
    axios({
        method: 'get',
        url:'http://127.0.0.1:8000/api/v1/movies/'
    })
    .then((res)=>{
        this.movies = res.data
        console.log(res)
    })
 }
  
}
</script>

<style>

</style>