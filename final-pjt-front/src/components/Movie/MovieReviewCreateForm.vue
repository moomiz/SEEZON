<template>
    <div>
      <form @submit.prevent="createMovieReview" >
        <label for="content">리뷰내용: </label>
        <input type="text" id="content" v-model="content">
        <input type="submit" value="create">
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
  
  </style>