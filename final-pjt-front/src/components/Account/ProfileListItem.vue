<template>
  <div>
    <router-link v-if="what==='movie'" :to="{ name: page, params: { id: item.id } }">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`" :alt="item.title">
    </router-link>
    <router-link v-if="what==='review'" :to="{ name: page, params: { id: item.movie } }">{{ item.content }}</router-link>
    <router-link v-if="what==='article'" :to="{ name: page, params: { id: item.id } }">{{ item.title }}</router-link>
    <router-link v-if="what==='comment'" :to="{ name: page, params: { id: item.article } }">{{ item.content }}</router-link>
    <!-- {{ pageName }}
    {{ page }}
    {{ what }} -->
  </div>
</template>

<script>
export default {
  name: 'ProfileListItem',
  props: {
    item: Object,
    page: String,
    what: String,
  },
}
</script>

<style>

</style>