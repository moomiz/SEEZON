<template>
  <li @click="genreClick" class="hoverpink">
    {{ genre.name }}
  </li>
</template>

<script>
export default {
  name: 'MovieFilterGenreItem',
  props: {
    genre: Object,
  },
  methods: {
    genreClick() {
      this.$emit('genre-click', this.genre.id )
      // console.log('클릭됨?')
    }
  }
}
</script>

<style>
.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
</style>