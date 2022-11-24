<template>
  <div class="col-3" style="padding-bottom: 30px">
    <router-link :to="{ name: 'moviedetailpage', params: { id: movie.id } }"><img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`" :alt="movie?.title"></router-link>
  </div>
</template>

<script>
export default {
  name: 'MovieFilterItem',
  props: {
    movie: Object,
  },
  data() {
    return {
    }
  },
  methods: {
  },
  watch: {
    genreId() {
      this.getMovies()
    }
  }
}
</script>

<style>

</style>