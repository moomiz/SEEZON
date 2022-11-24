<template>
  <div class="w-75 text-center" style="margin: auto; min-height: 100vh; height: auto;">
    <div class="my-3">
      <router-link class="text-decoration-none" :to="{ name: 'articlecreate' }">[CREATE]</router-link>
    </div>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '@/components/Article/ArticleList';
// import axios from 'axios';
export default {
  name: 'ArticleView',
  components: {
    ArticleList
  },
  data() {
    return {
    }
  },
}
</script>

<style>

</style>