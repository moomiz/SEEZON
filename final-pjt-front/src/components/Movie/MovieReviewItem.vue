<template>
  <div>
    <p>{{ review.username }}: {{ review.content }}</p>
    <!-- {{ review }} -->
  </div>
</template>

<script>
export default {
  name: 'MovieReviewItem',
  props: {
    review: Object,
  }
}
</script>

<style>

</style>