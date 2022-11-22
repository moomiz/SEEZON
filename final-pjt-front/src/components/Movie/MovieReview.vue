<template>
  <div>
    <h5>Review</h5>
    <hr>
    <MovieReviewCreateForm />
    <MovieReviewItem
    v-for="review in reviews"
    :review="review"
    :key="review.id"/>
  </div>
</template>

<script>
import MovieReviewItem from '@/components/Movie/MovieReviewItem'
import MovieReviewCreateForm from './MovieReviewCreateForm';
export default {
  name: 'MovieReview',
  props: {
    reviews: Array,
  },
  components: {
    MovieReviewItem,
    MovieReviewCreateForm
  }
}
</script>

<style>

</style>