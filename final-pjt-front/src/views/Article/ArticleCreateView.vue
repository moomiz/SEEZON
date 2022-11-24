<template>
  <div class="container" style="width: 100%; min-height: 100vh;">
    <div class="row">
      <div class="col-lg-3 col-md-2"></div>
      <div class="col-lg-6 col-md-8 login-box">
        <div class="col-lg-12 login-title">Article Create</div>
        <div class="col-lg-12 login-form">
          <form class="m-3" @submit.prevent="createArticle">
            <div class="form-group">
              <label class="form-control-label" for="title">title : </label>
              <input class="form-control" type="text" id="title" v-model="title"><br>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="content">content : </label>
              <textarea type="content" class="form-control-textarea" id="content" v-model="content"></textarea><br>
            </div>
            <div class="login-btm">
              <input class="btn" type="submit" value="create">
            </div>
          </form>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCreateView',
  data() {
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    createArticle() {
      if (this.$store.getters.isLogin === true) {
        const title = this.title
        const content = this.content

        const payload = {
          title,
          content
        }

        this.$store.dispatch('createArticle', payload)
      } else {
          this.$router.push({ name: 'login' })
      }
    },
  },
  beforeCreate(){
      if (this.$store.getters.isLogin === false) {
        alert('로그인이 필요합니다!')
        this.$router.push({ name: 'login' })
      }
  },
}
</script>

<style>
textarea[type=content] {
    background-color: #46464643;
    border: none;
    border-bottom: 1px solid  #e93c78;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
    width:100%;
    height: 20vh;
}
textarea:focus {
    outline: none;
    box-shadow: 0 0 0;
}
.row{
  padding-top: 5%;
}
.btn{
  --bs-btn-color: #e93c78!important;
}

</style>