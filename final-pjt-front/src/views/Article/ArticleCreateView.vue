<template>
  <div>
    <form @submit.prevent="createArticle">
      <label for="title">title : </label>
      <input type="text" id="title" v-model="title"><br>

      <label for="content">content : </label>
      <textarea id="content" v-model="content"></textarea><br>

      <input type="submit" value="create">
    </form>
  </div>
</template>

<script>
export default {
  name: 'ArticleCreateView',
  data() {
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    createArticle() {
      const title = this.title
      const content = this.content

      const payload = {
        title,
        content
      }

      this.$store.dispatch('createArticle', payload)
      this.$router.push({ name: 'article' })
    }
  }
}
</script>

<style>

</style>