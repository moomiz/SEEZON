<template>
  <div>
  </div>
</template>

<script>
export default {
    name:'LogoutView',
    created() {
        this.$store.dispatch('logout')
        this.$router.go(-1)
    }
}
</script>

<style>

</style>