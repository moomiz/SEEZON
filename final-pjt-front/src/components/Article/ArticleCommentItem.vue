<template>
  <div>
    <!-- {{ comment }} -->
    {{ comment.content }} {{ comment.username }}
  </div>
</template>

<script>
export default {
  name: 'ArticleCommentItem',
  props: {
    comment: Object,
  }
}
</script>

<style>

</style>