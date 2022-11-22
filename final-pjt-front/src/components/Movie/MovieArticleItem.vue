<template>
  <div>
    <p>{{ article.username }}: <router-link :to="{ name: 'articledetail', params: { id: article.id }}">{{ article.title }}</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'MovieArticleItem',
  props: {
    article: Object,
  }
}
</script>

<style>

</style>