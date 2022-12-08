<template>
<in-development></in-development>
</template>

<script>
import InDevelopment from '@/components/InDevelopment'
import localization from '@/modules/MainModule/pages/main/localization.json'
export default {
  name: 'SingleIssuePage',
  components: { InDevelopment },
  data () {
    return {
    }
  },
  computed: {
    l10n () {
      return localization[this.$lang]
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
