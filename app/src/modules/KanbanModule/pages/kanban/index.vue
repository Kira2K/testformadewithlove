<template>
  <main-layout>
<in-development></in-development>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import InDevelopment from '@/components/InDevelopment'
import localization from '@/modules/MainModule/pages/main/localization.json'
export default {
  name: 'KanbanPage',
  components: { InDevelopment, MainLayout },
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
