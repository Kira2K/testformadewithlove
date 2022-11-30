<template>
  <component :is="iconClass" />
</template>

<script>

import IconList from '@/components/Icons'

export default {
  name: 'NavigationIcon',
  mixins: [IconList],
  props: {
    routeName: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconClass: {
      get () {
        const route = this.$routes.find(x => x.name === this.routeName)
        if (route) {
          return route?.meta?.icon
        }
        return null
      }
    }
  }
}
</script>
