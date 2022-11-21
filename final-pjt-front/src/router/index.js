import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/Article/ArticleView'
import MovieDetailView from '@/views/Movie/MovieDetailView'
import LoginView from '@/views/Account/LoginView'
import SignUpView from '@/views/Account/SignUpView'
import MoviesView from '@/views/Movie/MoviesView'
import ArticleDetailView from '@/views/Article/ArticleDetailView'
import ArticleUpdateView from '@/views/Article/ArticleUpdateView'
import ArticleCreateView from '@/views/Article/ArticleCreateView'
import LogoutView from '@/views/Account/LogoutView'
import ProfileView from '@/views/Account/ProfileView'

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
  // {
  //   path: '/movie/:id',
  //   name: 'moviedetail',
  //   component: MovieDetailView,
  //   props: true,
  //   meta: {
  //     showModal: true
  //   }
  // },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
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
  {
    path: '/article/create',
    name: 'articlecreate',
    component: ArticleCreateView,
  },
  {
    path: '/article/:id/update',
    name: 'articleupdate',
    component: ArticleUpdateView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
