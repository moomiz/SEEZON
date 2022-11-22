<template>
  <div>
    <h5>Article</h5>
    <hr>
    <MovieArticleItem
    v-for="article in articles"
    :key="article.id"
    :article=article />
  </div>
</template>

<script>
import MovieArticleItem from '@/components/Movie/MovieArticleItem'
export default {
  name: 'MovieArticle',
  components: {
    MovieArticleItem,
  },
  props: {
    articles: Array,
  }
}
</script>

<style>

</style>