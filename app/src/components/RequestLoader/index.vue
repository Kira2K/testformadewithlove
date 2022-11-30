<template>
  <div class="loading" v-if="show">
    <div class="loading__blur"></div>
    <div class="loading__wrapper">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RequestLoader',
  props: {
    killTimeout: {
      type: Number,
      default: 10000
    }
  },
  computed: {
    ...mapGetters('ui', ['getActiveRequestCount']),
    show: {
      get () {
        return this.getActiveRequestCount > 0
      }
    }
  },
  data () {
    return {
      killTimer: null
    }
  },
  watch: {
    show (val) {
      if (this.killTimer) {
        clearTimeout(this.killTimer)
      }
      if (val && this.killTimeout) {
        this.killTimer = setTimeout(() => {
          this.$store.dispatch('ui/resetRequestCount')
        }, this.killTimeout)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.loading {
  &__blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, .1);
    backdrop-filter: blur(2px);
    z-index: 9000;
  }
  &__wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    z-index: 9001;
  }
  & .el-icon-loading {
    font-size: 50px;
    color: var(--neon-main);
  }
}
</style>
