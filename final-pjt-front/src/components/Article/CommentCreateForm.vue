<template>
  <div>
    <form @submit.prevent="createComment" >
      <label for="content">댓글내용: </label>
      <input type="text" id="content" v-model="content">
      <input type="submit" value="create">
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommentCreateForm',
  data() {
    return {
      content: null,
    }
  },
  methods: {
    createComment() {
      if (this.$store.state.username) {
        const content = this.content
        const id = this.$route.params.id
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/v2/articles/${id}/comment/create/`,
          data: {
            content: content,
          },
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          }
        }).then(()=>{  // res
          // context.commit('CREATE_ARTICLE', res.data)
          // router.push({ name: 'articledetail', params:{ id: payload.id }})
          this.$emit('new-comment')
          this.content = null
        }).catch((err)=>{
          console.log(err)
        })
      } else {
        alert('로그인이 필요합니다!')
      }
    }
  }
}
</script>

<style>

</style>