<template>
  <div class="row">
    <!-- {{ pageName }} -->
    <ProfileListItem
    v-for="item in list"
    :key="item.id" 
    :item=item 
    :page=pageName
    :what=isWhat
    />
  </div>
</template>

<script>
import ProfileListItem from '@/components/Account/ProfileListItem'

export default {
  name: 'ProfileList',
  components: {
    ProfileListItem,
  },
  data() {
    return {
    }
  },
  props: {
    list: Array,
    pageName: String,
    isWhat: String,
  }
}
</script>

<style>

</style>