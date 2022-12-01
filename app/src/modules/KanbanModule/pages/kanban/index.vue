<template>
  <main-layout>
    <kanban-board
      :stages="stages"
      :blocks="blocks"
      @update-block="updateBlock"
      >
      </kanban-board>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import localization from '@/modules/MainModule/pages/main/localization.json'
export default {
  name: 'KanbanPage',
  components: { MainLayout },
  data () {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      blocks: [
        {
          id: 1,
          status: 'on-hold',
          title: 'Test'
        }
      ]
    }
  },
  computed: {
    l10n () {
      return localization[this.$lang]
    }
  },
  methods: {
    updateBlock (id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
