<template>
<div class="logo-wrapper">
  <div :class="logoClass">
    <div :class="imageClass">
      <logo-large-dark v-if="theme === 'dark' && (size === 'large' || size === 'medium')" />
      <logo-large-light v-else-if="theme === 'light' && (size === 'large' || size === 'medium')" />
      <logo-small v-else-if="size === 'small'" />
    </div>
    <div :class="nameClass" v-if="text">
        {{ text }}
    </div>
  </div>
</div>
</template>

<script>
import LogoLargeDark from './logo/LogoLargeDark'
import LogoLargeLight from './logo/LogoLargeLight'
import LogoSmall from './logo/LogoSmall'

const size = ['small', 'medium', 'large']

export default {
  name: 'Logo',
  components: {
    LogoLargeDark,
    LogoLargeLight,
    LogoSmall
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    size: {
      default: 'medium',
      validator (value) {
        return size.includes(value)
      }
    },
    text: String
  },
  computed: {
    logoClass () {
      const classObject = {
        logo: true
      }

      if (size.includes(this.size)) {
        classObject[`logo--${this.size}`] = true
      }

      return classObject
    },
    imageClass () {
      const classObject = {
        logo__image: true
      }

      if (size.includes(this.size)) {
        classObject[`logo__image--${this.size}`] = true
      }

      return classObject
    },
    nameClass () {
      const classObject = {
        logo__name: true
      }

      if (size.includes(this.size)) {
        classObject[`logo__name--${this.size}`] = true
      }

      return classObject
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss" />
