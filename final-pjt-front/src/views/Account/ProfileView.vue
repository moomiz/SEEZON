<template>
  <div>
    <p>{{ username }}님의 프로필입니다.</p>
    <p>first name : {{ firstName }}</p>
    <p>last name : {{ lastName }}</p>
    <button v-if="username === recentUser" @click="withDrawal" >회원탈퇴</button>
    <router-link :to="{ name: 'profile-update', params: { username: recentUser }}" v-if="username === recentUser">회원 정보 수정</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProfileView',
    methods: {
        withDrawal() {
          this.$store.dispatch('withDrawal')
        },
    },
    data() {
      return {
        username: this.$route.params.username,
        firstName: null,
        lastName: null,
        isAdult: null,
      }
    },
    created() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v3/${this.username}/`,
      }).then((res)=>{
        this.firstName = res.data.first_name
        this.lastName = res.data.last_name
        this.isAdult = res.data.is_adult
      })
    },
    computed: {
      recentUser() {
        return this.$store.state.username
      }
    }
}
</script>

<style>

</style>