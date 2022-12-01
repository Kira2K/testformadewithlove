<template>
  <div class="layout">
    <request-loader />
      <router-view  v-slot="{ Component }">
          <component :is="Component" :key="$route.name" />
      </router-view>
    <confirm-server-error></confirm-server-error>
  </div>
</template>
<script>
import ConfirmServerError from '@/components/ConfirmServerError'
import RequestLoader from '@/components/RequestLoader'

export default {
  name: 'Application',
  components: { RequestLoader, ConfirmServerError },
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  created () {
    // Toggle theme to make it work correct
    this.$store.dispatch('ui/setThemeStyle', this.$theme ?? 'dark')
  },
  computed: {
  },
  data () {
    return {
    }
  }
}
</script>
