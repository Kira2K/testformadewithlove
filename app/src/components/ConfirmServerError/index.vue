<template>
  <div></div>
</template>

<script>
import localization from './localization.json'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ConfirmServerError',
  computed: {
    ...mapGetters('ui', [
      'getShowServerError',
      'getTextShowServerError'
    ]),
    l10n () {
      return localization[this.$lang]
    },
    contentText () {
      return this.getTextShowServerError ?? this.l10n.content
    }
  },
  methods: {
    ...mapActions(['$setShowServerError']),
    handleOkError () {
      this.$setShowServerError(false)
    },
    showServerErrorConfirm () {
      this.$confirm(this.contentText, this.l10n.header, {
        confirmButtonText: this.l10n.yes,
        showCancelButton: false,
        showClose: false,
        type: 'error'
      }).then(() => {
        this.handleOkError()
      }).catch(() => {
        this.$setShowServerError(false)
      })
    }
  },
  watch: {
    getShowServerError: function () {
      if (this.getShowServerError) this.showServerErrorConfirm()
    }
  }
}
</script>
