<template>
  <div id="app">
    <nav>
      <router-link style="color: #ed1b64;" :to="{ name: 'index' }"><h3>seezone</h3></router-link>
      <div class=navbarleft>
        <router-link style="padding-right:10px" v-if="!isLogin" :to="{ name: 'login' }"><h5 class="mx-2 hoverpink">Login</h5></router-link>
        <router-link style="padding-right:10px" v-if="isLogin" :to="{ name: 'logout' }"><h5 class="mx-2 hoverpink">Logout</h5></router-link> 
        <router-link style="padding-right:10px" :to="{ name: 'article' }"><h5 class="mx-1 hoverpink">Article</h5></router-link>
        <span v-if="isLogin"></span>
        <router-link style="padding-right:10px; padding-left: 5px;" v-if="isLogin" :to="{ name: 'profile', params: { username: recentUser } }"><h5 class="hoverpink">Profile</h5></router-link> 
        <MovieSearchBar />
      </div>
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
  min-height: 100vh;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  text-align: justify;
  position: sticky;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration-line: none ;
  flex: none;
}

nav a.router-link-exact-active {
  color: #ed1b64;
  text-decoration-line: none ;
}
.navbarleft{
  display: flex;
  justify-content: space-between;
}
nav div h1{
  color: #ed1b64;
  background-color: transparent;
  text-align: center;
}
body::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
}

body::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background:gray; /* 스크롤바의 색상 */
    
    border-radius: 10px;
}

body::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
}

.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
</style>
