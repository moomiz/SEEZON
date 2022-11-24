<template>
    <div class="SearchBar">
        <h5 class="hoverpink" style="background-color:transparent; padding-left: 10px;" v-b-modal.modal-1>Search</h5>
        <b-modal id="modal-1" title="Search">
            <input type="text"
            v-model="MovieTitleSearchString" 
            placehoder = "Search Movie">
        <div class="movie" v-for="movie in filteredMovieFeed" :key="movie.id">
            <router-link
            :to="{ name: 'moviedetailpage', params: { id: movie.id } }">
            <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
            </router-link>
            <br>
            <h3>{{ movie?.title }}</h3>
        </div>
    </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'MovieSearchBar',
    data() {
        return {
            MovieTitleSearchString:'',
            movies: null
            
        }
    },
    created() {
        axios({
            method: 'get',
            url:'http://127.0.0.1:8000/api/v1/movies/'
        })
        .then((res)=>{
            this.movies = res.data
            console.log(res)
        })
    },
    computed: {
        filteredMovieFeed: function () {

        var movies = this.movies;
        var MovieTitleSearchString = this.MovieTitleSearchString;

        if(!MovieTitleSearchString){
            return;
        }
        movies = movies.filter(function(item){
            if(item.title.toLowerCase().indexOf(MovieTitleSearchString) !== -1){
            return item;
            }
        })

        return movies;
        }
      }
    }
</script>

<style>

#modal-1___BV_modal_footer_ button {
   display: none;
}
#modal-1___BV_modal_header_ button{
   background-color:transparent;
   border: transparent;
   }

.hoverpink {
  color: white
}
.hoverpink:hover {
  color: palevioletred;
}
</style>