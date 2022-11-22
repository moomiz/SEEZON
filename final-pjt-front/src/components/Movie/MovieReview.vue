<template>
  <div>
    <h5>Review</h5>
    <hr>
    <MovieReviewItem
    v-for="review in reviews"
    :review="review"
    :key="review.id"/>
  </div>
</template>

<script>
import MovieReviewItem from '@/components/Movie/MovieReviewItem'
export default {
  name: 'MovieReview',
  props: {
    reviews: Array,
  },
  components: {
    MovieReviewItem,
  }
}
</script>

<style>

</style>