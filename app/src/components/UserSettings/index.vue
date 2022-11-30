<template>
  <div class="settings">
    <el-popover
        placement="bottom"
        width="235"
        trigger="click">
      <el-button slot="reference" icon="el-icon-user"></el-button>
      <div class="settings__content">
        <div class="settings__content-row" v-if="langValue">
          <div class="settings__icon">
            <lang></lang>
          </div>
          <div class="settings__item">
            <el-select v-model="langValue" @change="handleLangSelect">
              <el-option
                  v-for="item in langOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="settings__content-row">
          <div class="settings__icon">
            <theme></theme>
          </div>
          <div class="settings__item" @click="showThemesSelect = !showThemesSelect">{{ locale[lang].customization }}</div>
        </div>
        <div class="settings__content-row">
          <div class="settings__icon">
            <manual></manual>
          </div>
          <div class="settings__item">
            <a href="/static/Manual.pdf" target="_blank">{{ locale[lang].manual }}</a>
          </div>
        </div>
        <div class="settings__content-row" v-if="autorized">
          <div class="settings__icon">
            <logout></logout>
          </div>
          <div class="settings__item" @click="handleExit">{{ locale[lang].exit }}</div>
        </div>
      </div>
    </el-popover>
    <el-dialog
      :title="locale[lang].customization"
      :visible.sync="showThemesSelect"
      width="60%"
    >
      <div class="settings__theme">
        <div>
          <el-radio v-model="themeValue" label="dark" @change="handleThemeChange">{{locale[lang].dark}}</el-radio>
          <div class="settings__theme-image">
            <dark></dark>
          </div>
        </div>
        <div>
          <el-radio v-model="themeValue" label="light" @change="handleThemeChange">{{locale[lang].light}}</el-radio>
          <div class="settings__theme-image">
            <light></light>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Lang from '@/components/Icons/Lang'
import Theme from '@/components/Icons/Theme'
import Manual from '@/components/Icons/Manual'
import Logout from '@/components/Icons/Logout'
import Dark from '@/components/Images/Dark'
import Light from '@/components/Images/Light'

import locale from './locale.json'

export default {
  name: 'UserSettings',
  components: {
    Lang,
    Theme,
    Manual,
    Logout,
    Dark,
    Light
  },
  props: {
    languages: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      required: true
    },
    manualSrc: String,
    userName: String,
    userAvatar: String,
    autorized: Boolean,
    sound: Boolean,
    demo: Boolean,
    theme: String
  },
  data () {
    return {
      locale,
      showPopover: false,
      showThemesSelect: false,
      showManualConfirm: false,
      themeValue: this.theme,
      langValue: this.lang
    }
  },
  computed: {
    langOptions () {
      if (this.languages && typeof this.languages === 'object') {
        const options = []
        for (const key in this.languages) {
          options.push({
            value: key,
            label: this.languages[key]
          })
        }
        return options
      } else {
        return null
      }
    }
  },
  methods: {
    handleThemeChange () {
      this.$emit('on-theme-change', this.themeValue)
    },
    handleLangSelect () {
      this.$emit('on-lang-select', this.langValue)
    },
    handleExit () {
      this.$emit('on-exit')
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss" />
