<template>
  <div>
    <router-link :to="{ name: 'articledetail', params: { id: article?.id }}">{{ article?.title }}</router-link>    
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