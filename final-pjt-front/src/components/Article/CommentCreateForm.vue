<template>
  <div>
    <form class="createComment">
      <label for="content" ></label>
      <input class="contentForm" type="text" id="content" v-model="content" placeholder="댓글을 입력하세요...">
      <p class="mt-2 hoverpink" @click="createComment">CREATE</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommentCreateForm',
  data() {
    return {
      content: null,
    }
  },
  methods: {
    createComment() {
      if (this.$store.state.username) {
        const content = this.content
        const id = this.$route.params.id
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/v2/articles/${id}/comment/create/`,
          data: {
            content: content,
          },
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          }
        }).then(()=>{  // res
          // context.commit('CREATE_ARTICLE', res.data)
          // router.push({ name: 'articledetail', params:{ id: payload.id }})
          this.$emit('new-comment')
          this.content = null
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
.createComment {
  display: flex;
  justify-content:space-between
}
.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
</style>