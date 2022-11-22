<template>
  <div v-if="!this.delete">
    <span><router-link :to="{ name: 'profile', params: { username: comment?.username} }">{{ comment?.username }}</router-link></span>
    <span>: </span>
    <span ref="edited">{{ comment?.content }}</span>
    <span><button @click="edit=!edit">edit</button></span>
    <span><button @click="commentDelete">delete</button></span>
    <span><button v-if="!isIn" @click="commentLike">♡</button></span>
    <button v-if="isIn" @click="commentLike">♥</button><br>
    <span>{{ commentLikeUsers }}</span>
    <div v-if="edit">
      <form @submit.prevent="commentEdit">
        <label for="content">수정내용: </label>
        <input type="text" id="content" v-model="content" @keyup.enter="commentEdit">
        <input type="submit" value="Edit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCommentItem',
  props: {
    comment: Object,
  },
  data() {
    return {
      content: this.comment.content,
      edit: false,
      isIn: false,
      delete: false,
      commentLikeUsers: null,
    }
  },
  methods: {
    commentEdit() {
      if (this.$store.getters.isLogin === true) {
        const articleId = this.$route.params.id
        const commentId = this.comment.id
        const commentContent = this.content

        const payload = {
          articleId, commentId, commentContent,
        }
        this.$store.dispatch('commentEdit', payload)
        this.edit = false
        // console.log(this.$refs.edited)
        this.$refs.edited.innerText = `${commentContent}`
      } else {
        this.$router.push({ name: 'login' })
      }
    }, 
    commentDelete() {
      if (this.$store.getters.isLogin === true) {
        const articleId = this.$route.params.id
        const commentId = this.comment.id

        const payload = {
          articleId, commentId
        }
        this.$store.dispatch('commentDelete', payload)
        this.delete = true
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    commentLike() {
      if (this.$store.getters.isLogin === true) {
        this.$store.dispatch('commentLike', this.comment.id)
        if (this.isIn) {
          this.commentLikeUsers -= 1
        } else {
          this.commentLikeUsers += 1
        }
        this.isIn = !this.isIn
      } else {
        this.$router.push({ name: 'login' })
      }
    },
  },
  created() {
    this.isIn = this.comment.like_users.includes(this.$store.state.id)
    this.commentLikeUsers = this.comment.like_users.length
  }
}
</script>

<style>

</style>