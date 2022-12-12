<template>
  <main-layout>
    <div class="main-page-wrapper">
      <h2>Welcome page</h2>
      <ul class="main-page__ul">
        <li>
          1. Move issues through kanban board.
        </li>
        <li>
          2. Create new issues.
        </li>
        <li>
          3. Edit existing issues.
        </li>
        <li>
          4. You may delete issues with "production" status.
        </li>
        <li>
          5. Board can display up to 100 issues. After what, you will have to delete an existing issue to see hidden ones.
        </li>
        <li>
          6. You can change language & theme in user's settings. Every page supports both themes. Most pages are localised.
        </li>
        <li>
          7. Info about issues is stored in db.json. Info about user's settings is stored in localStorage.
        </li>
        <li>
          7. Deploying the project to Heroku is coming soon.
        </li>
      </ul>
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
