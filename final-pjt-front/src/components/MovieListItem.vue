<template>
  <div>
    <router-link :to="{ name: 'detail', params: { id: movie.id } }">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
    </router-link>
  </div>
</template>

<script>


export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  }
}
</script>

<style>

</style>