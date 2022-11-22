<template>
  <div>
    <form @submit.prevent="articleUpdate">
      <label for="title">title : </label>
      <input type="text" id="title" v-model="title"><br>

      <label for="content">content : </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea>

      <input type="submit" value="[UPDATE]">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticleUpdateView',
  data() {
    return {
      article: null,
      title: null,
      content: null,
    }
  },
  methods : {
    articleUpdate() {
      if (this.$store.getters.isLogin === true) {
        const title = this.title
        const content = this.content
        const id = this.$route.params.id

        const payload = {
          id,
          title,
          content,
        }

        this.$store.dispatch('articleUpdate', payload)
      } else {
        this.$router.push({ name: 'login' })
      }
    },
  },
  created(){
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v2/articles/${this.$route.params.id}/`
    }).then((res)=>{
      this.article = res.data
      this.title = res.data.title
      this.content = res.data.content
    }).catch((err)=>{
      console.log(err)
    })
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