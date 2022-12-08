<template>
  <main-layout>
    <template>
    <router-view v-if="isSubPage" />
<in-development  v-else></in-development>
  </template>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import InDevelopment from '@/components/InDevelopment'
import localization from '@/modules/MainModule/pages/main/localization.json'
export default {
  name: 'IssuesPage',
  components: { InDevelopment, MainLayout },
  data () {
    return {
    }
  },
  computed: {
    l10n () {
      return localization[this.$lang]
    },
    isSubPage () {
      return this.$route.matched.length > 1
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
