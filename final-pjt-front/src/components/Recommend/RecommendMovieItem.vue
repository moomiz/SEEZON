<template>
  <div class="movie-list">
    <div>
      <img @click="goDetail" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
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

</style>