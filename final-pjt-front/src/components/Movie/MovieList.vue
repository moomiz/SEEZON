<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <MovieListItem
        v-for="movie in movies"
        :key="movie.id"
        :movie=movie
        />
      <div
          class="swiper-pagination"
          v-for="movie in  movies"
          :key="movie.id"
          slot="pagination"
        ></div>
        <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
		<div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import MovieListItem from '@/components/Movie/MovieListItem'
import axios from 'axios'
import { Swiper} from "vue-awesome-swiper";
import "swiper/css/swiper.css";


export default {
  name: 'MovieList',
  components:{
    MovieListItem,
    Swiper,

  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    const that = this;
    return{
      movies: null,
      imgIndex: 1,
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        speed: 3000,
        direction: "horizontal",
        grabCursor: true,
        on: {
          slideChangeTransitionStart: function() {
            that.imgIndex = this.realIndex - 1;
          }
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        },
        navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},                 
      }
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
 },

 swiperOption: { 
    slidesPerView: 1, 
    spaceBetween: 30, 
    loop: true, 
    pagination: { 
        el: '.swiper-pagination', 
        clickable: true 
    }, 
    navigation: { 
        nextEl: '.swiper-button-next', 
        prevEl: '.swiper-button-prev' 
    } 
},
computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
}
</script>

<style>

</style>