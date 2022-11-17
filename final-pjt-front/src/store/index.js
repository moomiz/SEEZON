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
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'index' })
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
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
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
        }
      })
        .then((res) => {
          // console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
        })
    },


  },
  modules: {
  }
})
