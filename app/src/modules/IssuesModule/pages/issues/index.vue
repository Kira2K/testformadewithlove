<template>
  <main-layout>
    <template>
    <router-view v-if="isSubPage" />
    <div v-else>
      <p>
      <router-link :to="'/issues/create'">
      <el-button>{{l10n.createNew}}</el-button>
      </router-link>
      </p>
    <in-development></in-development>
    </div>

  </template>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import InDevelopment from '@/components/InDevelopment'
import localization from './localization.json'
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
