<template>
  <div class="main" :collapsed="getMenuCollapsed">
    <div class="main__side-menu">
      <navigation-menu
        class="main__side-menu-item"
        :logo-title="l10n.kira"
        :lang="$lang"
        :theme="$theme"
        :routes="allowedRoutes"
        @on-click-item="toPage"
        @on-click-logo="toHomePage"
        :collapsed="getMenuCollapsed"
        :sound="$soundOn"
      />
    </div>
    <div class="main__main-content">
      <div class="main__main-content-header">
        <div class="main__main-content-header-left">
          <div class="header-icon" @click="changeMenuCollapsed">
            <menu-fold v-if="!getMenuCollapsed"></menu-fold>
            <menu-unfold v-if="getMenuCollapsed"></menu-unfold>
          </div>
          <div class="main__main-content-header-breadcrumb">
            <div class="home-icon" @click="toHomePage">
              <home></home>
            </div>
            <i class="el-icon-arrow-right"></i>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="item.isChild || item.id === $route.name? null : { path: '/' + item.id }" v-for="item in breadcrumbs" :id="item.id" :key="item.id">
                {{ item.text }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="main__main-content-header-right">
          <el-tooltip
              placement="bottom">
            <div class="webcam-icon">
              <webcam></webcam>
            </div>
            <template #content>
              {{ l10n.soon }}
            </template>
          </el-tooltip>
          <user-settings
            :languages="$languages"
            :lang="$lang"
            :sound="$soundOn"
            autorized
            :theme="$theme"
            :user-name="$userName"
            @on-lang-select="handleLangSelect"
            @on-theme-change="handleThemeChange"
            @on-exit="logout"
          />
        </div>
      </div>
      <div class="main__main-content-main">
        <slot />
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import localization from './localization.json'
import { getUserRightsByRouteName } from '@/helpers/getUserRightsByRouteName'
import { safeCopyObj } from '@/helpers/safeCopyObj'
import NavigationMenu from '@/components/NavigationMenu'
import UserSettings from '@/components/UserSettings'
import MenuFold from '@/components/Icons/MenuFold'
import MenuUnfold from '@/components/Icons/MenuUnfold'
import Home from '@/components/Icons/Home'
import Webcam from '@/components/Icons/Webcam'

export default {
  name: 'MainLayout',
  components: {
    NavigationMenu,
    UserSettings,
    MenuFold,
    MenuUnfold,
    Home,
    Webcam
  },
  data () {
    return {
      logsContent: []
    }
  },
  methods: {
    toPage (name) {
      if (this.$route.name !== name) {
        this.$router.push({ name })
      }
    },
    toHomePage () {
      this.toPage('main')
    },
    logout () {
      window.location.href = '/api/logout'
    },
    ...mapActions('ui', [
      'setThemeStyle',
      'changeMenuCollapsed'
    ]),
    handleLangSelect (lang) {
      this.$store.dispatch('ui/setLang', lang)
    },
    handleThemeChange (theme) {
      this.$store.dispatch('ui/setThemeStyle', theme)
    },
    openLogs () {
      if (this.isUserHaveLogsRights) this.$router.push({ path: '/admin/log' })
    }
  },
  computed: {
    ...mapGetters('ui', [
      'getRoutes',
      'getMenuCollapsed'
    ]),
    ...mapGetters('status', ['status']),
    allowedRoutes () {
      const allowedRoutes = []
      this.$routes.map(el => {
        const route = safeCopyObj(el)
        const rights = getUserRightsByRouteName({ routeName: route.name, roles: this.$roles })
        if (rights.read)allowedRoutes.push(route)
      })
      allowedRoutes.map(route => {
        if (route.children) {
          route.children = route.children.filter(childRoute => getUserRightsByRouteName({ routeName: childRoute.name, roles: this.$roles }).read)
        }
      })
      return allowedRoutes
    },
    breadcrumbs () {
      const matchedRoutes = this.$routes.find((route) => route.name === this.$route.matched[0].name)
      if (matchedRoutes.children) {
        return [
          {
            id: matchedRoutes.name,
            text: matchedRoutes.meta.title[this.$lang]
          },
          // eslint-disable-next-line
          ...matchedRoutes.children.filter((route) => route.name === this.$route.name).map((route) => ({ id: route.name, text: route.meta.title[this.$lang], isChild: true }))
        ]
      } else {
        return [
          {
            id: matchedRoutes.name,
            text: matchedRoutes.meta.title[this.$lang]
          }
        ]
      }
    },
    l10n () {
      return localization[this.$lang]
    }

  },
  mounted () {
    if (this.$theme === '') this.setThemeStyle('dark')
  }
}

</script>

<style lang="scss" src="./style.scss" />
