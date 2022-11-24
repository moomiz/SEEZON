<template>
  <div class="container" style="width: 100%; min-height: 100vh;">
    <div class="row">
      <div class="col-lg-3 col-md-2"></div>
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-title">Profile Update</div>
        <div class="col-lg-12 login-form">
          <form class="m-3" @submit.prevent="userUpdate">
            <div class="form-group">
              <label class="form-control-label" for="first-name">first name : </label>
              <input class="form-control" type="text" id="first-name" v-model="firstName">
            </div>
            <div class="form-group">
              <label class="form-control-label" for="last-name">last name : </label>
              <input class="form-control" type="text" id="last-name" v-model="lastName">
            </div>
            <label class="form-control-label"  for="is-adult">adult? : </label>
            <input type="checkbox" id="is-adult" :checked="isAdult" @change="Adult">
            <div class="login-btm">
              <input class="btn" type="submit" value="UPDATE">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProfileUpdateView',
    data() {
      return {
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
        // console.log(this.recentUser)

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
    computed: {
      recentUser() {
        return this.$route.params.username
      }
    },
    created() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v3/detail/${this.recentUser}/`
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