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
      :stages="getStages"
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
            class="drag-item__header-title"
            >
            <span>
              {{l10n.task}} {{ block.id }}
            </span>
          </router-link>

            <i
              v-if="block.status!=='production'"
              class="el-icon-edit-outline"
              @click="()=>$router.push('/issues/'+block.id)"
              >
            </i>

            <i
              v-else
              class="el-icon-delete"
              @click="deleteIssue({issue:block})"
              >
            </i>
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
    }
  },

  computed: {
    ...mapGetters('issues', [
      'getIssues'
    ]),
    ...mapGetters('kanban', [
      'getStages'
    ]),
    l10n ():Object {
      return localization[this.$lang]
    }
  },
  methods: {
    ...mapActions('issues', [
      'changeIssueStatusById', 'fetchIssuesList', 'deleteIssue'
    ]),
    ...mapActions('kanban', [
      'fetchStages'
    ]),
    async updateBlock (id, status):Promise<void> {
      const args:ChangeIssueStatusByIdArg = { id: Number(id), status }
      await this.changeIssueStatusById(args).then((updatedIssue) => {
        if (updatedIssue) this.fetchIssuesList()
      })
    },
    createNewIssue ():void {
      this.$router.push({ path: 'issues/create' })
    }
  },
  async mounted () {
    this.fetchStages()
    this.fetchIssuesList()
  }
})
</script>

<style scoped lang="scss" src="./style.scss" />
