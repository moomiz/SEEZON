<template>
  <div style="display:inline-flex; width:30%" >
      <div class="profile-movie" v-if="what==='movie'">
        <router-link :to="{ name: page, params: { id: item.id } }">
          <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`" :alt="item.title">
        </router-link>
      </div>
  
      <div class="card" v-if="what==='review'" style="display:inline-block; word-break: break-all; width: 100%; height: auto;">
        <router-link :to="{ name: page, params: { id: item.movie } }">{{ item.content }}</router-link>
      </div>
    
      <div class="card" v-if="what==='article'" style="display:inline-block; word-break: break-all; width: 70%; height: auto;">
        <router-link :to="{ name: page, params: { id: item.id } }">{{ item.title }}</router-link>
      </div>
      <div class="card" v-if="what==='comment'" style="display:inline-block; word-break: break-all; width: 70%; height: auto;">
        <router-link :to="{ name: page, params: { id: item.article } }">{{ item.content }}</router-link>
      </div>
    <!-- {{ pageName }}
    {{ page }}
    {{ what }} -->
  </div>
</template>

<script>
export default {
  name: 'ProfileListItem',
  props: {
    item: Object,
    page: String,
    what: String,
  },
}
</script>

<style>
.card{
  height: 3rem;
  width: 18rem;
  padding:10px;
  margin:10px;
  background: rgba(85, 84, 84, 0.306)!important;
 

}
.card a{
  width: 18rem;
  text-decoration: none;
  color:rgba(255, 255, 255, 0.384);
}
.profile-movie{
  display: inline-flex;
  -moz-box-direction: normal;
  margin:10px

}

</style>