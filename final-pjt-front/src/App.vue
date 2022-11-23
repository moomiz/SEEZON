<template>
  <div id="app">
    <nav>
      <h3>seezone</h3>
      <div>
        <router-link :to="{ name: 'index' }">Home</router-link> |
        <router-link v-if="!isLogin" :to="{ name: 'login' }">login</router-link>
        <router-link v-if="isLogin" :to="{ name: 'logout' }">logout</router-link> |
        <router-link :to="{ name: 'article' }">article</router-link>
        <span v-if="isLogin"> | </span>
        <router-link v-if="isLogin" :to="{ name: 'profile', params: { username: recentUser } }">profile</router-link> 
      </div>
      <MovieSearchBar />
    </nav>
    <router-view/>
  </div>
</template>

<script>
import MovieSearchBar from '@/components/Movie/MovieSearchBar'
export default {
  name: 'App',
  components : {
    MovieSearchBar
  },
  data() {
    return {
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    recentUser() {
      return this.$store.state.username
    }
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background: black;
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  text-align: justify;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration-line: none ;
  flex: none;
}

nav a.router-link-exact-active {
  color: #ed1b64;
  text-decoration-line: none ;
}
nav div {
  flex: none;
  
}


</style>
