<template>
  <tr>
    <td style="font-size: 80%">{{ movieTitle }}</td>
    <td><router-link style="color:palevioletred" class="text-decoration-none" :to="{ name: 'articledetail', params: { id: article?.id }}">{{ article?.title }}</router-link></td>
    <td>{{ article?.like_users.length }}</td>
    <td><router-link style="color:plum" class="text-decoration-none" :to="{ name: 'profile', params: { username: article.username} }">{{ article.username }}</router-link></td>
    <td>{{ article?.created_at.substr(0, 10) }}</td>
    <hr>
  </tr>
  <!-- <div>
    <p v-if="article.movie">{{ movieTitle }}</p>
    <h4><router-link style="color:palevioletred" class="text-decoration-none" :to="{ name: 'articledetail', params: { id: article?.id }}">{{ article?.title }}</router-link></h4>
    <p>LIKE {{ article?.like_users.length }}</p>
    <router-link style="color:plum" class="text-decoration-none" :to="{ name: 'profile', params: { username: article.username} }">{{ article.username }}</router-link>
    <hr>
  </div> -->
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticleListItem',
  props: {
    article: Object,
  },
  data() {
    return {
      movieTitle: null,
    }
  },
  methods: {
    getMovie() {
      axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/movies/${this.article.movie}/`,
      }).then((res)=>{
        this.movieTitle = res.data.title
      })
    }
  },
  created() {
    if (this.article.movie) {
      this.getMovie()
    }
  }
}
</script>

<style>
</style>