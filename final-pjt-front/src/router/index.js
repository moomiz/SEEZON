import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/Article/ArticleView'
import MovieDetailView from '@/views/Movie/MovieDetailView'
import LoginView from '@/views/Account/LoginView'
import SignUpView from '@/views/Account/SignUpView'
import MoviesView from '@/views/Movie/MoviesView'
import ArticleDetailView from '@/views/Article/ArticleDetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: MoviesView,
    children: [
      {
        path: '/movie/:id',
        name: 'moviedetail',
        component: MovieDetailView,
        props: true,
        meta: {
          showModal: true
        }
      }
    ]
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
    path: '/article',
    name: 'article',
    component: ArticleView,
  },
  {
    path: '/article/:id',
    name: 'articledetail',
    component: ArticleDetailView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
