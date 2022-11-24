<template>
  <div id="app">
    <nav>
      <router-link style="color: #ed1b64;" :to="{ name: 'index' }"><h3>seezone</h3></router-link>
      <div class=navbarleft>
        <router-link style="padding-right:10px" v-if="!isLogin" :to="{ name: 'login' }"><h5 class="mx-2 hoverpink">Login</h5></router-link>
        <router-link style="padding-right:10px" v-if="isLogin" :to="{ name: 'logout' }"><h5 class="mx-2 hoverpink">Logout</h5></router-link> 
        <router-link style="padding-right:10px" :to="{ name: 'article' }"><h5 class="mx-1 hoverpink">Article</h5></router-link>
        <router-link style="padding-right:10px" v-if="isLogin" :to="{ name: 'profile', params: { username: recentUser } }"><h5 class="hoverpink">Profile</h5></router-link> 
        <router-link style="padding-right:10px; padding-left: 5px;" :to="{ name: 'moviefilter' }"><h5 class="mx-1 hoverpink">Filter</h5></router-link>
        <MovieSearchBar />
      </div>
    </nav>
    <router-view/>
    <footer>
      <hr>
      <h5 class="text-start px-5 mx-5 pt-2">SEEZONE</h5>
      <hr>
      <div class="d-flex justify-content-between px-5 pt-2">
        <div class="d-flex">
          <p class="px-5">SSAFY 8 GUMI team 9 </p>
          <p class="px-5">공지사항</p>
          <p class="px-5">이용약관</p>
          <p class="px-5">청소년 보호 정책</p>
        </div>
        <p class="px-5"> LEESIJUN - KIMMINJI</p>
      </div>
      <hr>
      <div class="d-flex justify-content-between px-5">
        <p class="px-5">(주) 9해조팀</p>
        <pre><p>movie for you enjoy with your friends or someone who want to see movie with you</p></pre>
        <pre>Copyright© LSJ KMJ seezone corp. All rights reserved.</pre>
      </div>
    </footer>
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
footer {
  color: rgb(117, 106, 106)
}
</style>
