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
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    SAVE_TOKEN(state, userdata) {
      state.token = userdata.key
      state.username = userdata.username
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
        const userdata = {
          key: res.data.key,
          username: payload.username
        }
        context.commit('SAVE_TOKEN', userdata)
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
          const userdata = {
            key: res.data.key,
            username: payload.username
          }
          context.commit('SAVE_TOKEN', userdata)
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
    deleteArticle(context,payload) {
      axios({
        method: 'delete',
        url:`${API_URL}/api/v2/articles/${payload}/`,
        headers: {
          Authorization: `Token ${this.state.token}`,
        },
      }).then(()=>{
        router.push(router.push({ name: 'article' }))
      }).catch((err)=>{
        console.log(err)
      })
    },
    createComment(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/articles/${payload.id}/comment/create/`,
        data: {
          content: payload.content,
        },
        headers: {
          Authorization: `Token ${this.state.token}`,
        }
      }).then(()=>{  // res
        // context.commit('CREATE_ARTICLE', res.data)
        router.push({ name: 'articledetail', params:{ id: payload.id }})
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
        router.push({ name: 'articledetail', params:{ id: payload.articleId }})
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
        router.push({ name: 'articledetail', params:{ id: payload.articleId }})
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  modules: {
  }
})
