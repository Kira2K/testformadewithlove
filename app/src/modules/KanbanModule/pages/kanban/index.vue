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
      :blocks="getIssues"
      @update-block="updateBlock"
      >
      <div
        v-for="block in getIssues"
        :slot="block.id"
        :key="block.id"
        class="drag-item__inner">
        <div class="drag-item__header">
          <router-link
            :to="'/issues/'+block.id"
            class="drag-item__header"
            >
            <span>
              {{l10n.task}} {{ block.id }}
            </span>
          </router-link>
        </div>
        <div class="drag-item__body">
          <p class="drag-item__title">{{ block.title }}</p>
        </div>
      </div>
    </kanban-board>
  </main-layout>
</template>

<script lang="ts">
import MainLayout from '@/layouts/Main/index.vue'
import localization from './localization.json'
import { mapGetters, mapActions } from 'vuex'
import { ChangeIssueStatusByIdArg } from '@/types'
import Vue from 'vue'
export default Vue.extend({
  name: 'KanbanPage',
  components: { MainLayout },
  data () {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved', 'production']
    }
  },

  computed: {
    ...mapGetters('issues', [
      'getIssues'
    ]),
    l10n ():Object {
      return localization[this.$lang]
    }
  },
  methods: {
    ...mapActions('issues', [
      'changeIssueStatusById', 'fetchIssuesList'
    ]),
    updateBlock (id, status):void {
      const args:ChangeIssueStatusByIdArg = { id: Number(id), status }
      this.changeIssueStatusById(args)
    },
    createNewIssue ():void {
      // const text = this.l10n.availableNext
      this.$setTextShowServerError('text')
    }
  },
  async mounted () {
    await this.fetchIssuesList()
  }
})
</script>

<style scoped lang="scss" src="./style.scss" />
