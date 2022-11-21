<template>
  <div class="movie-list">
    <router-link
        :to="{ name: 'moviedetail', params: { id: movie.id } }">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
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
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000000;
}
.modal-route .modal-content {
  width: 90%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>