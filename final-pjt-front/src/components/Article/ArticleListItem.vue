<template>
  <tr class="selectedTr">
    <td style="font-size: 80%"><router-link class="text-decoration-none hoverpink" :to="{ name: 'moviedetailpage', params: { id: movie?.id } }">{{ movie?.title }}</router-link></td>
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
      movie: null,
    }
  },
  methods: {
    getMovie() {
      axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/movies/${this.article.movie}/`,
      }).then((res)=>{
        this.movie = res.data
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
.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
.selectedTr:hover {
  background-color: rgba(216, 112, 147, 0.247);
}
</style>