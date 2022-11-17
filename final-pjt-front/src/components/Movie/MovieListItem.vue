<template>
  <div class="movie-list">
    <router-link tag="div"
        class="item"
        :to="{ name: 'moviedetail', params: { id: movie.id } }">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="movie.title">
    </router-link>
    <div v-if="showModal" class="modal-route">
      <div class="modal-content">
        <router-view></router-view>
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
        this.showModal = newVal.meta && newVal.meta.showModal;
      }
    }
  },
  data() {
    return {
      showModal: false
    }
  },
}
</script>

<style>
.movie-list .item {
  padding: 16px;
  border-radius: 4px;
  border: solid 1px #e2e2e2;
}
.movie-list .item:not(:last-child) {
  margin-bottom: 8px;
}
.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal-route .modal-content {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
}
</style>