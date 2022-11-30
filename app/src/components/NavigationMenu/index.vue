<template>
  <div>
    <el-menu class="el-menu-vertical" :collapse="collapsed" :default-active="activeRoute">
      <router-link to="/" class="el-menu__logo">
        <logo v-if="!collapsed" :text="logoTitle" :theme="theme" @on-click="$emit('on-click-logo')" />
        <logo v-if="collapsed" :text="logoTitle" :theme="theme" size="small" @on-click="$emit('on-click-logo')" />
      </router-link>
      <template v-for="route in routes">
        <el-menu-item v-if="!route.children"
          :key="lang + route.name"
          :index="route.name"
          @click = handleClickItem(route.name)
        >
          <div class="menu-icon">
            <navigation-icon :route-name="route.name"></navigation-icon>
          </div>
          <span class="menu-icon__title">{{ route.meta.title[$lang] }}</span>
        </el-menu-item>
        <el-submenu v-if="route.children"
         :key="lang + route.name"
         :index="route.name"
        >
          <template slot="title">
            <div class="menu-icon">
              <navigation-icon :route-name="route.name"></navigation-icon>
            </div>
            <span slot="title" class="menu-icon__title">{{ route.meta.title[$lang] }}</span>
          </template>
          <template v-for="child in route.children">
            <el-menu-item
              :key="lang + child.name"
              :index="child.name"
              :selected="child.meta.selected"
              :disabled="child.meta.disabled"
              @click = handleClickItem(child.name)
            >
              {{ child.meta.title[$lang] }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// Menu from other project
import Logo from '@/components/Logo'
import NavigationIcon from '@/components/NavigationIcon'

export default {
  name: 'NavigationMenu',
  components: {
    Logo,
    NavigationIcon
  },
  props: {
    theme: String,
    lang: String,
    logoTitle: String,
    collapsed: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array,
      validator (routes) {
        let condition = true
        routes.forEach((route) => {
          condition = condition && route.name && route.meta && route.meta.title && route.meta.icon
          if (route.children && condition) {
            route.children.forEach((child) => {
              condition = condition && child.name && child.meta && child.meta.title
            })
          }
        })
        if (!condition) {
          throw new TypeError('NavigationMenu: data object has wrong format, required fields are: name, meta.title, meta.icon')
        }
        return condition
      }
    }
  },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    // l10n () {
    //   return localization[this.$lang]
    // },
    activeRoute () {
      return this.$route.name
    }
  },
  methods: {
    handleClickItem (itemName) {
      this.$emit('on-click-item', itemName)
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss"/>
