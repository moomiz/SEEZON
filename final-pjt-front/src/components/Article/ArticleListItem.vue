<template>
  <div>
    <h4><router-link :to="{ name: 'articledetail', params: { id: article?.id }}">{{ article?.title }}</router-link></h4>
    <router-link :to="{ name: 'profile', params: { username: article.username} }">{{ article.username }}</router-link>
    <hr>
  </div>
</template>

<script>
export default {
    name: 'ArticleListItem',
    props: {
      article: Object,
    }
}
</script>

<style>

</style>