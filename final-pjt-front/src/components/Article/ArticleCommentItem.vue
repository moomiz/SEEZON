<template>
  <div>
    <!-- {{ comment }} -->
    <span>{{ comment?.username }}: </span>
    <span>{{ comment?.content }}</span>
    <span><button>edit</button></span>
    <span><button @click="commentDelete">delete</button></span>
    
  </div>
</template>

<script>
export default {
  name: 'ArticleCommentItem',
  props: {
    comment: Object,
  },
  methods: {
    // commentEdit() {
    //   this.$store.dispatch('commentEdit',)
    // },
    commentDelete() {
      const articleId = this.$route.params.id
      const commentId = this.comment.id

      const payload = {
        articleId, commentId
      }
      this.$store.dispatch('commentDelete', payload)
    }
  }
}
</script>

<style>

</style>