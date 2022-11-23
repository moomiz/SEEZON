<template>
  <div style="width: 100%; min-height: 100vh;">
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
      if (this.$store.getters.isLogin === true) {
        const title = this.title
        const content = this.content

        const payload = {
          title,
          content
        }

        this.$store.dispatch('createArticle', payload)
      } else {
          this.$router.push({ name: 'login' })
      }
    },
  },
  beforeCreate(){
      if (this.$store.getters.isLogin === false) {
        alert('로그인이 필요합니다!')
        this.$router.push({ name: 'login' })
      }
  },
}
</script>

<style>

</style>