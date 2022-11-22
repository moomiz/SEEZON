<template>
  <div style="width: 100%; min-height: 100vh;">
    <form @submit.prevent="userUpdate">
      <label for="first-name">first name : </label>
      <input type="text" id="first-name" v-model="firstName">
      
      <label for="last-name">last name : </label>
      <input type="text" id="last-name" v-model="lastName">

      <label for="is-adult">adult? : </label>
      <input type="checkbox" id="is-adult" :checked="isAdult" @change="Adult">
      <br>
      <input type="submit" value="[UPDATE]">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProfileUpdateView',
    data() {
      return {
        recentUser: this.$route.params.username,
        firstName: null,
        lastName: null,
        isAdult: false,
      }
    },
    methods: {
      userUpdate() {
        const firstName = this.firstName
        const lastName = this.lastName
        const isAdult = this.isAdult

        const payload = {
          username: this.recentUser,
          firstName,
          lastName,
          isAdult,
        }

        this.$store.dispatch('userUpdate', payload)
      },
      Adult(){
        this.isAdult = !this.isAdult
      }
    },
    created() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v3/${this.recentUser}/`
      }).then((res)=>{
        this.firstName = res.data.first_name
        this.lastName = res.data.last_name
        console.log(res.data.is_adult)
        console.log(res.data)
        this.isAdult = res.data.is_adult
      }).catch((err)=>{
        console.log(err)
      })
    }
}
</script>

<style>

</style>