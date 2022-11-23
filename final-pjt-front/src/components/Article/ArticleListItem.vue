<template>
  <div >
    <h4><router-link style="color:palevioletred" class="text-decoration-none" :to="{ name: 'articledetail', params: { id: article?.id }}">{{ article?.title }}</router-link></h4>
    <p>LIKE {{ article?.like_users.length }}</p>
    <router-link style="color:plum" class="text-decoration-none" :to="{ name: 'profile', params: { username: article.username} }">{{ article.username }}</router-link>
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