<template>
  <main-layout>
      <el-button
          class="add-btn"
          size="medium"
          icon="el-icon-circle-plus"
          @click="createNewIssue"
      >
      {{l10n.addNew}}
      </el-button>
    <kanban-board
      :stages="stages"
      :blocks="blocks"
      @update-block="updateBlock"
      >
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
import localization from './localization.json'
export default {
  name: 'KanbanPage',
  components: { MainLayout },
  data () {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved', 'production'],
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
    },
    createNewIssue () {
      const text = this.l10n.availableNext
      this.$setTextShowServerError(text)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
