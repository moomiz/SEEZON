<template>
  <div>
    <router-link class="text-decoration-none" :to="{ name: 'articlecreate' }">[CREATE]</router-link>
    <hr>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '@/components/Article/ArticleList';
export default {
  name: 'ArticleView',
  components: {
    ArticleList
  }
}
</script>

<style>

</style>