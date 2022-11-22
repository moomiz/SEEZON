<template>
  <div style="width: 100%; min-height: 100vh;">
    <p>{{ user?.username }}님의 프로필입니다.</p>
    <p>팔로워: {{ userFollowers }}</p>
    <p>팔로잉: {{ user?.followings.length }}</p>
    <button v-if="!isIn" @click="userFollow" >follow</button>
    <button v-if="isIn" @click="userFollow" >unfollow</button>
    <p>first name : {{ user?.firstName }}</p>
    <p>last name : {{ user?.lastName }}</p>
    <button v-if="user?.username === recentUser" @click="withDrawal" >회원탈퇴</button>
    <router-link :to="{ name: 'profile-update', params: { username: recentUser }}" v-if="user?.username === recentUser">회원 정보 수정</router-link>
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
    userFollow() {
      if (this.$store.getters.isLogin === true) {
        this.$store.dispatch('userFollow', this.user.id)
        if (this.isIn) {
          this.userFollowers -= 1
        } else {
          this.userFollowers += 1
        }
        this.isIn = !this.isIn
      } else {
        alert('로그인이 필요합니다!')
      }
    },
  },
  data() {
    return {
      user: null,
      isIn: null,
      userFollowers: null,
    }
  },
  created() {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v3/${this.$route.params.username}/`,
    }).then((res)=>{
      this.user = res.data
      this.isIn = this.user.followers.includes(this.$store.state.id)
      this.userFollowers = this.user.followers.length
    })
  },
  computed: {
    recentUser() {
      return this.$store.state.username
    }
  },
}
</script>

<style>

</style>