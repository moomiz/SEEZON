<template>
  <div>
    <button @click="withDrawal" >회원탈퇴</button>
  </div>
</template>

<script>
export default {
    name: 'ProfileView',
    methods: {
        withDrawal() {
            this.$store.dispatch('withDrawal')
        }
    }
}
</script>

<style>

</style>