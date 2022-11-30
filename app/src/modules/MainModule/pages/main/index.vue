<template>
  <main-layout>
    <div class="main-page-wrapper">
      <h2>Welcome page</h2>

    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import localization from '@/modules/MainModule/pages/main/localization.json'

export default {
  name: 'MainPage',
  components: { MainLayout },
  beforeMount () {
  },
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
  }
}
</script>

<style lang="scss" src="./style.scss" />
