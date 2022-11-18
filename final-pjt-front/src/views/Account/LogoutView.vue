<template>
  <div>
  </div>
</template>

<script>
export default {
    name:'LogoutView',
    created() {
        this.$store.dispatch('logout')
        this.$router.push({ name: 'index' })
    }
}
</script>

<style>

</style>