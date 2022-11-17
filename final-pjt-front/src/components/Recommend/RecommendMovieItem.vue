<template>
  <b-carousel-slide
    img-src=""
  ></b-carousel-slide>
</template>

<script>
export default {
  name: 'RecommendMovieItem',
  props: {
    movie: Object,
  },
}
</script>

<style>
b-carousel-slide {
  height: 100%;
  object-fit: cover;
}
</style>