<template>
  <div>
    <form class="createReview" @submit.prevent="createMovieReview" >
      <label for="content"></label>
      <input class="contentForm w-50 pr-3" type="text" id="content" v-model="content" @keyup.enter="createMovieReview">
      <span style="color:transparent">...</span>
      <p class="mt-2 hoverpink" @click="createMovieReview">CREATE</p>
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MovieReviewCreateForm',
  data() {
    return {
      content: null,
    }
  },
  methods: {
    createMovieReview() {
      if (this.$store.getters.isLogin === true) {
        const content = this.content
        const id = this.$route.params.id
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/v1/movies/${id}/review/create/`,
          data: {
            content: content,
          },
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          }
        }).then(()=>{  // res
          // context.commit('CREATE_ARTICLE', res.data)
          // router.push({ name: 'articledetail', params:{ id: payload.id }})
          this.$emit('new-review')
        }).catch((err)=>{
          console.log(err)
        })
      } else {
        alert('로그인이 필요합니다!')
      }
    }
  }
}
</script>

<style>
.contentForm{
  width: 88%;
  border-radius: 10px;
  height: 35px;
}
.b{
  font-size:15px;
  border-radius: 10px;
  background-color: transparent;
  color:palevioletred;
  border-color:palevioletred;
  height: 30px;
  padding-right: 10px;
}
.createReview {
  display: flex;
  justify-content:center;
  padding-right: 10px;
}
.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
</style>