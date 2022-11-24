<template>
  <div class="movie-list" >
    <router-link
        :to="{ name: 'moviedetail', params: { id: movie.id } }">
      <img class="style_prevu_kit" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
    </router-link>
    <div v-if="movie.id == this.$route.params.id">
      <div v-if="showModal" class="modal-route" :key="movie.id">
        <div class="modal-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(newVal) {
        this.showModal = newVal.meta && newVal.meta.showModal && this.$route.params.id === this.movie.id;
      }
    }
  },
  methods: {
    modalShow(){
      // console.log(`#myModal-${this.$route.params.id}`)
      // const myModal = document.getElementById(`myModal-${this.$route.params.id}`)
      // console.log(myModal)
      // myModal.showModal = true
      this.showModal = true
    },
  },
  data() {
    return {
      showModal: false
    }
  },
  mounted(){
    this.modalShow()
  }
}
</script>

<style>
.movie-list .item:not(:last-child) {
  margin-bottom: 8px;
}
.modal-route {
  z-index:999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000000;
}
.modal-route .modal-content {
  width: 70%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: black;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  border-radius:12px ;
}
.style_prevu_kit
{
    border:0;
    position: relative;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1); 
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1); 
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1);
    transition: all 200ms ease-in;
    transform: scale(1);   

}
.style_prevu_kit:hover
{
    box-shadow: 0px 0px 150px #000000;
    z-index: 2;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.2);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.2);   
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.2);
    transition: all 200ms ease-in;
    transform: scale(1.2);
}
.modal-content::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
}

.modal-content::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background:pink; /* 스크롤바의 색상 */
    border-radius: 10px;
}

.modal-content::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
}

</style>