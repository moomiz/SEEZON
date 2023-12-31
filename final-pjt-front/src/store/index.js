import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    firstName: null,
    lastName: null,
    id: null,
    isAdult: null,
    like_genre: []
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
  },
  mutations: {
    SAVE_TOKEN(state, payload) {
      state.token = payload.token
      state.username = payload.username
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.id = payload.id
      state.isAdult = payload.isAdult
      const genres = []
      if (payload.genres) {
        payload.genres.forEach((genre) => {
          genres.push(genre.id)
        }) 
      }
      state.like_genre = genres
      router.go(-1)
    },
    SAVE_MOVIE(state, payload) {
      state.token = payload.token
      state.username = payload.username
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.id = payload.id
      state.isAdult = payload.isAdult
      const genres = []
      if (payload.genres) {
        payload.genres.forEach((genre) => {
          genres.push(genre.id)
        }) 
      }
      state.like_genre = genres
    },
    LOGOUT(state) {
      state.token = null
      state.username = null
      state.firstName = null
      state.lastName = null
      state.id = null
      state.isAdult = null
      state.like_genre = []
    },
  },
  actions: {
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v3/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      }).then((res) => {
        // console.log(res)
        const userdata = {
          token: res.data.key,
          username: payload.username
        }
        context.dispatch('recentUser', userdata)
      }).catch((err)=>{
        console.log(err)
      })
    },
    recentUser(context, userdata) {
      axios({
        method:'get',
        url: `${API_URL}/api/v3/detail/${userdata.username}/`,
        headers: {
          Authorization: `Token ${userdata.token}`,
        }
      }).then((res)=>{
        const payload = {
          id: res.data.id,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          isAdult: res.data.is_adult,
          username: res.data.username,
          token: userdata.token,
          genres: res.data.like_movies[res.data.like_movies.length - 1]?.genres,
        }
        context.commit('SAVE_TOKEN', payload)
      }).catch((err)=>{
        console.log(err)
      })
    },
    lastMovie(context, userdata) {
      axios({
        method:'get',
        url: `${API_URL}/api/v3/detail/${userdata.username}/`,
        headers: {
          Authorization: `Token ${userdata.token}`,
        }
      }).then((res)=>{
        const payload = {
          id: res.data.id,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          isAdult: res.data.is_adult,
          username: res.data.username,
          token: userdata.token,
          genres: res.data.like_movies[res.data.like_movies.length - 1]?.genres,
        }
        context.commit('SAVE_MOVIE', payload)
      }).catch((err)=>{
        console.log(err)
      })
    },
    logout(context) {
      axios({
        method:'post',
        url: `${API_URL}/api/v3/logout/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then((res)=>{
        console.log(res)
        context.commit('LOGOUT')
      }).catch((err)=>{
        console.log(err)
      })
      
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v3/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        },
        // headers: {'Content-Type': 'application/x-www-form-urlencoded' },
      }).then((res) => {
          // console.log(res)
          const userdata = {
            token: res.data.key,
            username: payload.username
          }
          context.dispatch('recentUser', userdata)
      }).catch((err)=>{
        console.log(err)
      })
    },
    withDrawal(context) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v3/delete/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then(()=>{
        router.push({ name:'index' })
        context.commit('LOGOUT')
      }).catch((err)=>{
        console.log(err)
      })
    },
    userUpdate(context, payload) {
      console.log(payload.username, ',,,')
      axios({
        method: 'post',
        url: `${API_URL}/api/v3/update/${payload.username}/`,
        data: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          is_adult: payload.isAdult,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then((res)=>{
        console.log(res)
        router.push({ name: 'profile', params: { username: payload.username } })
      }).catch((err)=>{
        console.log(err)
      })
    },
    userFollow(context, userId) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v3/like/${userId}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    createArticle(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/create/`,
        data: {
          title: payload.title,
          content: payload.content,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then(()=>{  // res
        // context.commit('CREATE_ARTICLE', res.data)
        router.push({ name: 'article' })
      }).catch((err)=>{
        console.log(err)
      })
    },
    createMovieArticle(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/${payload.movie}/create/`,
        data: {
          title: payload.title,
          content: payload.content,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then(()=>{  // res
        // context.commit('CREATE_ARTICLE', res.data)
        router.go(-1)
      }).catch((err)=>{
        console.log(err)
      })
    },
    articleUpdate(context, payload) {
      axios({
        method: 'put',
        url: `${API_URL}/api/v2/articles/${payload.id}/`,
        data: {
          title: payload.title,
          content: payload.content,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then(()=>{ // res
        // context.commit('ARTICLE_UPDATE', res.data)
        router.push({ name: 'articledetail', params: { id: payload.id } })
      }).catch((err)=>{
        console.log(err)
      })
    },
    deleteArticle(context, payload) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/articles/${payload}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then(()=>{
        router.push(router.push({ name: 'article' }))
      }).catch((err)=>{
        console.log(err)
      })
    },
    articleLike(context, articleId) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/${articleId}/like/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })

    },
    commentDelete(context, payload) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v2/articles/${payload.articleId}/comment/${payload.commentId}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then(()=>{
        // router.push({ name: 'articledetail', params:{ id: payload.articleId }})
      }).catch((err)=>{
        console.log(err)
      })
    },
    commentEdit(context, payload) {
      axios({
        method: 'put',
        url: `${API_URL}/api/v2/articles/${payload.articleId}/comment/${payload.commentId}/`,
        data: {
          content: payload.commentContent,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then(()=>{
        // router.go(router.currentRoute)
      }).catch((err)=>{
        console.log(err)
      })
    },
    commentLike(context, commentId) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/comment/like/${commentId}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    reviewEdit(context, payload) {
      axios({
        method: 'put',
        url: `${API_URL}/api/v1/movies/${payload.movieId}/review/${payload.reviewId}/`,
        data: {
          content: payload.reviewContent,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then(()=>{
        // router.go(router.currentRoute)
      }).catch((err)=>{
        console.log(err)
      })
    },
    reviewLike(context, reviewId) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/movies/review/${reviewId}/like/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    movieLike(context, movidID) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/movies/${movidID}/like/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then((res)=>{
        context.dispatch('stateMovie')
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    stateMovie(context) {
      const userdata = {
        token: context.state.token,
        username: context.state.username
      }
      context.dispatch('lastMovie', userdata)
    }
  },
  modules: {
  }
})
