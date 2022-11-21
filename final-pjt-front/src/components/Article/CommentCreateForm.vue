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
export default {
    name: 'CommentCreateForm',
    data() {
      return {
        content:null
      }
    },
    methods: {
      createComment() {
        const content = this.content
        const id = this.$route.params.id
        const payload = {
          content,
          id
        }
        this.$store.dispatch('createComment', payload)

      }
    }
}
</script>

<style>

</style>