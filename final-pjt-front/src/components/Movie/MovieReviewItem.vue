<template>
  <div>
    <div v-if="!this.delete" class="d-flex justify-content-center">
      <div class="w-75 d-flex">
        <p class="pl-3" style="width: 10%"><router-link :to="{ name: 'profile', params: { username: review.username} }">{{ review.username }}</router-link></p>
        <p>: </p>
        <p style="display:inline-block; word-break: break-all; width: 70%; height: auto;" ref="edited">{{ review.content }}</p>
        <p class="px-3" @click="edit=!edit">edit</p>
        <p class="px-3" @click="reviewDelete">delete</p>
        <p class="px-3 hoverpink" v-if="!isIn" @click="reviewLike">🤍</p>
        <p class="px-3 hoverpink" v-if="isIn" @click="reviewLike">💖</p>
        <p>{{ reviewLikeUsers }}</p><br>
      </div>
    </div>
    <div v-if="edit">
      <form @submit.prevent="reviewEdit">
        <label for="content">수정내용: </label>
        <input type="text" id="content" v-model="content" @keyup.enter="reviewEdit">
        <input type="submit" value="Edit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieReviewItem',
  props: {
    review: Object,
  },
  data() {
    return {
      content: this.review.content,
      edit: false,
      isIn: false,
      delete: false,
      reviewLikeUsers: 0,
    }
  },
  methods: {
    reviewEdit() {
      if (this.$store.getters.isLogin === true) {
        if (this.$store.state.username === this.review.username) {
          const movieId = this.$route.params.id
          const reviewId = this.review.id
          const reviewContent = this.content
  
          const payload = {
            movieId, reviewId, reviewContent,
          }
          this.$store.dispatch('reviewEdit', payload)
          this.edit = false
          // console.log(this.$refs.edited)
          this.$refs.edited.innerText = `${reviewContent}`
          } else {
            alert(`${this.$store.state.username}님의 댓글이 아닙니다!`)
          }
        } else {
        alert('로그인이 필요합니다!')
      }
    }, 
    reviewDelete() {
      if (this.$store.getters.isLogin === true) {
        if (this.$store.state.username === this.review.username) {
          const articleId = this.$route.params.id
          const reviewId = this.review.id

          const payload = {
            articleId, reviewId
          }
          this.$store.dispatch('reviewDelete', payload)
          this.delete = true
        } else {
            alert(`${this.$store.state.username}님의 댓글이 아닙니다!`)
        }
      } else {
        alert('로그인이 필요합니다!')
      }
    },
    reviewLike() {
      if (this.$store.getters.isLogin === true) {
        this.$store.dispatch('reviewLike', this.review.id)
        if (this.isIn) {
          this.reviewLikeUsers -= 1
        } else {
          this.reviewLikeUsers += 1
        }
        this.isIn = !this.isIn
      } else {
        alert('로그인이 필요합니다!')
      }
    },
  },
  created() {
    this.isIn = this.review.like_users.includes(this.$store.state.id)
    this.reviewLikeUsers = this.review.like_users.length
  }
}
</script>

<style>
.hoverpink {
  color: white;
}
.hoverpink:hover {
  color: palevioletred;
}
</style>