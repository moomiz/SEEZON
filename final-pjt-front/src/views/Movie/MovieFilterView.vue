<template>
  <div>
      <div id="tab" style="padding-right: 25px">
        <ul>
          <MovieFilterGenreItem v-for="genre in genres" :key="genre?.id" :genre=genre 
          @genre-click="genreClick"/>
        </ul>
      </div>
      <div class="container">
        <MovieFilterList :genre-id=genreId />
      </div>
  </div>
</template>

<script>
import MovieFilterList from '@/components/Movie/MovieFilterList'
import MovieFilterGenreItem from '@/components/Movie/MovieFilterGenreItem'
import axios from 'axios'
export default {
  name: 'MovieFilter',
  components: {
    MovieFilterList,
    MovieFilterGenreItem
  },
  data() {
    return {
      genres: null,
      genreId: null,
    }
  },
  methods: {
    getGenres() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/genres/`
      }).then((res)=>{
        console.log(res.data)
        this.genres = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    genreClick(genreId) {
      this.genreId = genreId
    }
  },
  created() {
    this.getGenres()
  }
}
</script>

<style>
.genre {
  list-style:none;
  }
  
#tab ul{
  text-align:center
  }

#tab li{
  display:inline-block; 
  padding: 10px 20px;
  margin-right:10px;
  }

/* .box::-webkit-scrollbar{
    display: none; 
} */
/* .box::-webkit-scrollbar {
  width: 10px;
}
.box::-webkit-scrollbar-thumb {
  background-color: #2f3542;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
.box::-webkit-scrollbar-track {
  background-color: grey;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
} */

</style>