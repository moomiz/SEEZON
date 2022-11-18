import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'index' })
    },
    LOGOUT(state) {
      state.token = null
    }

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
        context.commit('SAVE_TOKEN', res.data.key)
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
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
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
      }).then((res)=>{
        context.commit('CREATE_ARTICLE', res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }


  },
  modules: {
  }
})
