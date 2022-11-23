<template>
  <div style="width: 100%; min-height: 100vh;">
    <p>{{ user?.username }}님의 프로필입니다.</p>
    <div v-if="user?.username!==recentUser">
      <button class="follow" v-if="!isIn" @click="userFollow" >follow</button>
      <button class="follow" v-if="isIn" @click="userFollow" >unfollow</button>
    </div>
    <p>팔로워: {{ userFollowers }}</p>
    <p>팔로잉: {{ user?.followings.length }}</p>
    <p>first name : {{ user?.first_name }}</p>
    <p>last name : {{ user?.last_name }}</p>
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
    getUsers() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v3/${this.$route.params.username}/`,
      }).then((res)=>{
        this.user = res.data
        this.isIn = this.user.followers.includes(this.$store.state.id)
        this.userFollowers = this.user.followers.length
      })
    }
  },
  data() {
    return {
      user: null,
      isIn: null,
      userFollowers: null,
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    recentUser() {
      return this.$store.state.username
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function() {
        this.getUsers()
      }
    }
  }, 
}
</script>

<style>
.follow {
  border: 1px solid rgb(255, 25, 94);
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 25, 94);
  border-radius: 10%;
  margin-bottom: 1%;
}
</style>