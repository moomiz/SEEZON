<template>
  <div class="col-3">
    <div v-if="what==='movie'" style="display:inline-block; word-break: break-all; width: 70%; height: auto;">
      <router-link :to="{ name: page, params: { id: item.id } }">
        <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`" :alt="item.title">
      </router-link>
    </div>
    <div v-if="what==='review'" style="display:inline-block; word-break: break-all; width: 70%; height: auto;">
      <router-link :to="{ name: page, params: { id: item.movie } }">{{ item.content }}</router-link>
    </div>
    <div v-if="what==='article'" style="display:inline-block; word-break: break-all; width: 70%; height: auto;">
      <router-link :to="{ name: page, params: { id: item.id } }">{{ item.title }}</router-link>
    </div>
    <div v-if="what==='comment'" style="display:inline-block; word-break: break-all; width: 70%; height: auto;">
      <router-link :to="{ name: page, params: { id: item.article } }">{{ item.content }}</router-link>
    </div>
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