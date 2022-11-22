<template>
  <div>
    <ArticleCommentItem
      v-for="comment in comments" :key="comment.id"
      :comment=comment
      />
  </div>
</template>

<script>
import ArticleCommentItem from '@/components/Article/ArticleCommentItem'
export default {
  name: 'ArticleCommentList',
  components: {
    ArticleCommentItem,
  },
  props: {
    comments: Array,
  },
  methods: {
  }
}
</script>

<style>

</style>