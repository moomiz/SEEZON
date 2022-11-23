<template>
  <div>
    <div v-if="!this.delete" class="d-flex justify-content-center">
      <div class="w-75 d-flex">
        <p class="pl-3" style="width: 10%"><router-link :to="{ name: 'profile', params: { username: comment?.username} }">{{ comment?.username }}</router-link></p>
        <p>: </p>
        <p style="display:inline-block; word-break: break-all; width: 70%; height: auto;" ref="edited">{{ comment?.content }}</p>
        <p class="px-3" @click="edit=!edit">edit</p>
        <p class="px-3" @click="commentDelete">delete</p>
        <p class="px-3" v-if="!isIn" @click="commentLike">🤍</p>
        <p class="px-3" v-if="isIn" @click="commentLike">💖</p>
        <p>{{ commentLikeUsers }}</p><br>
      </div>
    </div>
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
        if (this.$store.state.username === this.comment.username) {
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
            alert(`${this.$store.state.username}님의 댓글이 아닙니다!`)
          }
        } else {
        alert('로그인이 필요합니다!')
      }
    }, 
    commentDelete() {
      if (this.$store.getters.isLogin === true) {
        if (this.$store.state.username === this.comment.username) {
          const articleId = this.$route.params.id
          const commentId = this.comment.id

          const payload = {
            articleId, commentId
          }
          this.$store.dispatch('commentDelete', payload)
          this.delete = true
        } else {
            alert(`${this.$store.state.username}님의 댓글이 아닙니다!`)
        }
      } else {
        alert('로그인이 필요합니다!')
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
        alert('로그인이 필요합니다!')
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