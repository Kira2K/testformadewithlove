<template>
  <span class="in-development">
    <template v-if="pageName"><i class="el-icon-s-opportunity"></i>«{{ pageName }}»</template> {{ l10n.inDevelopment }}
  </span>
</template>

<script>
import localization from './localization.json'

export default {
  name: 'InDevelopment',
  props: {
    pageName: String
  },
  computed: {
    l10n () {
      return localization[this.$lang]
    }
  }
}
</script>

<style lang="scss" src="./style.scss" />
