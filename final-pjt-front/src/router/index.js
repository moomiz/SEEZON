import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/ArticleView'
import DetailView from '@/views/DetailView'
import LoginView from '@/views/LoginView'
import SignUpView from '@/views/SignUpView'
import MoviesView from '@/views/MoviesView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: MoviesView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/movie/:id',
    name: 'detail',
    component: DetailView,
  },
  {
    path: '/article',
    name: 'article',
    component: ArticleView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
