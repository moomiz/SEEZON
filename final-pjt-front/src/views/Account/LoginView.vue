<template>
  <div class="container" style="width: 100vw; height: 100vh;">
    <div class="row">
      <div class="col-lg-3 col-md-2"></div>
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-title">LogIn Page</div>
        <div class="col-lg-12 login-form">
            <form class="m-3" @submit.prevent="logIn">
              <div class="form-group">
                <labe class="form-control-label" for="username">ID </labe>
                <input class="form-control" type="text" id="username" v-model="username">
              </div>
              <div class="form-group">
                <label class="form-control-label" for="password"> PASSWORD  </label>
                <input class="form-control" type="password" id="password" v-model="password">
              </div>
              <div class="login-btm">
                <input class="btn"  type="submit" value="logIn">
                <router-link class="btn" :to="{ name: 'signup' }">signup</router-link>
              </div>
          </form>
        </div>   
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      this.$store.dispatch('logIn', payload)
    }
  },
  beforeCreate(){
      if (this.$store.getters.isLogin === true) {
        this.$router.push({ name: 'index' })
      }
  },
}
</script>

<style>
.container {
    background: black;
    font-family: 'Roboto', sans-serif;
}

.login-box {
    margin-top: 75px;
    height: auto;
    border-radius: 15px;
    background: rgba(25, 25, 25, 0.96);
    text-align: center;
    box-shadow: 0 3px 6px rgba(46, 45, 45, 0), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.login-key {
    height: 100px;
    font-size: 80px;
    line-height: 100px;
    background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.login-title {
    padding-top:20px;
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    color: #ECF0F5;
}

.login-form {
    margin-top: 25px;
    text-align: left;
}

input[type=text] {
    background-color: #46464643;
    border: none;
    border-bottom: 1px solid  #e93c78;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
}

input[type=password] {
    background-color: #1A2226;
    border: none;
    border-bottom: 1px solid #e93c78;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: #ECF0F5;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 1px solid #ed1b64;
    outline: 0;
    background-color: #1A2226;
    color: #ECF0F5;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}

label {
    margin-bottom: 0px;
}

.form-control-label {
    font-size: 14px;
    padding-bottom:5px;
    color: #6C6C6C;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    border-radius: 0px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #0DB8DE;
    right: 0px;
}

.login-btm {
    float: right;
    padding-bottom:20px;
}

.login-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}

.login-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.loginbttm {
    padding: 0px;
}
.btn{
  color:#e93c78 
}
</style>