<template>
  <div class="container" style="width: 100vw; height: 100vh;">
    <div class="row">
      <div class="col-lg-3 col-md-2"></div>
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-title">SignUp Page</div>
        <div class="col-lg-12 login-form">
      <form class="m-3" @submit.prevent="signUp">
        <div class="form-group">
          <label class="form-control-label" for="username">username : </label>
          <input class="form-control" type="text" id="username" v-model="username"><br>
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password1"> password : </label>
          <input class="form-control" type="password" id="password1" v-model="password1"><br>
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password2"> password confirmation : </label>
          <input class="form-control" type="password" id="password2" v-model="password2">
        </div>
        <div class="login-btm">
          <input class="btn" type="submit" value="SignUp">
        </div>
      </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        // username,
        // password1,
        // password2,
        username: username,
        password1: password1,
        password2: password2,
      }

      this.$store.dispatch('signUp', payload)

    }
  },
  mounted() {
    if (this.$store.getters.isLogin === true) {
      this.$router.push({ name: 'index' })
    }
  }

}
</script>

<style>

</style>