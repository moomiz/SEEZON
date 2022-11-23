<template>
  <div>
    <h5>Review</h5>
    <hr>
    <MovieReviewCreateForm
      @new-review="reviewAdd"
    />
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
  },
  methods: {
    reviewAdd() {
      this.$emit('new-review')
    }
  }
}
</script>

<style>

</style>