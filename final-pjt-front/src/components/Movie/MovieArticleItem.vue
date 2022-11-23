<template>
  <div>
    <p>{{ article.username }}: <router-link :to="{ name: 'articledetail', params: { id: article.id }}">{{ article.title }}</router-link><span class="px-3">LIKE {{ article.like_users.length }}</span></p>
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