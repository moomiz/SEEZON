<template>
  <div>
    <!-- {{ comment }} -->
    {{ comment.like_users }}
    <span><router-link :to="{ name: 'profile', params: { username: comment?.username} }">{{ comment?.username }}</router-link></span>
    <span>: </span>
    <span>{{ comment?.content }}</span>
    <span><button @click="edit=!edit">edit</button></span>
    <span><button @click="commentDelete">delete</button></span>
    <span><button v-if="!isIn" @click="commentLike">♥</button></span>
    <button v-if="isIn" @click="commentLike">♡</button><br>
    <div v-if="edit">
      <form @submit.prevent="commentEdit">
        <label for="content">수정내용: </label>
        <input type="text" id="content" v-model="content">
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
      isIn: null,
      commentLikeUsers: null,
    }
  },
  methods: {
    commentEdit() {
      const articleId = this.$route.params.id
      const commentId = this.comment.id
      const commentContent = this.content

      const payload = {
        articleId, commentId, commentContent,
      }
      this.$store.dispatch('commentEdit', payload)
    },
    commentDelete() {
      const articleId = this.$route.params.id
      const commentId = this.comment.id

      const payload = {
        articleId, commentId
      }
      this.$store.dispatch('commentDelete', payload)
    },
    commentLike() {
      this.$store.dispatch('commentLike',this.comment.like_users)
      if (this.isIn) {
        this.commentLikeUsers -= 1
      } else {
        this.commentLikeUsers += 1
      }
      this.isIn = !this.isIn
    }
  }
}
</script>

<style>

</style>