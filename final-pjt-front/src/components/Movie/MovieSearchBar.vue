<template>
    <div >
    <input type="text"
        v-model="authorNameSearchString" 
        placehoder = "Search Movie">
    <li class="movie" v-for="movie in filteredPhotoFeed" :key="movie.id">
        <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
        <span class="author">{{ movie?.title }}</span>
    </li>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'MovieSearchBar',
    data() {
        return {
            authorNameSearchString:'',
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
        filteredPhotoFeed: function () {

        var movies = this.movies;
        var authorNameSearchString = this.authorNameSearchString;

        if(!authorNameSearchString){
            return movies;
        }
        movies = movies.filter(function(item){
            if(item.author.toLowerCase().indexOf(authorNameSearchString) !== -1){
            return item;
            }
        })

        return movies;
        }
      }
    }
</script>

<style>

</style>