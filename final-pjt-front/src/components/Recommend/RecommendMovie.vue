
<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <RecommendMovieItem class="swiper-slide"
        v-for="movie in movies"
        :key="movie.id"
        :movie=movie
        />
        <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
		<div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import RecommendMovieItem from '@/components/Recommend/RecommendMovieItem'
import axios from 'axios'
import { Swiper} from "vue-awesome-swiper";
import "swiper/css/swiper.css";


export default {
  name: 'RecommendMovie',
  components:{
    RecommendMovieItem,
    Swiper
  },
  data(){
    const that = this;
    return{
      movies: null,
      imgIndex: 5,
      swiperOption: {
        notNextTick: true,
        spaceBetween: 6,
        loop: true,
        initialSlide: 0,
        speed: 500,
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
        breakpoints : { // 반응형 설정이 가능 width값으로 조정
          '@0.75': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '@1.00': {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    '@1.50': {
      slidesPerView: 5,
      spaceBetween: 50,
    },
        },
      },       
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
computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
}
</script>

<style>
</style>