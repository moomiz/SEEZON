<template>
  <div>
    <h4><router-link :to="{ name: 'articledetail', params: { id: article?.id }}">{{ article?.title }}</router-link></h4>
    <p>{{ article.username }}</p>
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