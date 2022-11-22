<template>
  <div class="movie-list">
    <div>
      <img class="style_prevu_kit" @click="goDetail" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
    </div>
    <!-- <router-link
        :to="{ name: 'moviedetail', params: { id: movie.id } }">
    </router-link> -->
  </div>
</template>

<script>


export default {
  name: 'RecommendMovieItem',
  props: {
    movie: Object,
  },
  methods: {
    goDetail() {
      this.$router.push({ name: 'moviedetail', params: { id: this.movie.id } })
    }
  }
}
</script>

<style>
.style_prevu_kit
{
    border:0;
    position: relative;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1); 
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1); 
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1);
    transition: all 200ms ease-in;
    transform: scale(1);   

}
.style_prevu_kit:hover
{
    box-shadow: 0px 0px 150px #000000;
    z-index: 2;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.2);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.2);   
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.2);
    transition: all 200ms ease-in;
    transform: scale(1.2);
}

</style>