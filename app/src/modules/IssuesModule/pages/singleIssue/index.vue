<template>

<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm form">
   <header class="form__header">{{headerText}}</header>

   <el-row >
      <el-col  :sm="24" :md="12" >
        <el-form-item :label="l10n.title" prop="title" :span="4">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-col>

      <el-col :sm="24" :md="12">
        <el-form-item :label="l10n.stage" prop="stages" :span="4">
          <el-select v-model="form.status" :placeholder="l10n.stages" class="form__select">
            <el-option
            :key="stage"
            v-for="stage in stages"
            :label="stage"
            :value="stage"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

   <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item :label="l10n.description" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-col>
   </el-row>

   <el-row :gutter="20">
      <el-col :sm="8" :md="24">
        <el-form-item >
          <div class="form__btn-container">
            <el-button class="form__btn" @click="resetForm('form')">{{l10n.reset}}</el-button>
            <el-button class="form__btn" type="danger" @click="submitForm('form')">{{l10n.save}}</el-button>
          </div>

        </el-form-item>
      </el-col>
   </el-row>
</el-form>
</template>

<script lang="ts">
import localization from './localization.json'
import { safeCopyObj } from '@/helpers/safeCopyObj'
import { mapGetters, mapActions } from 'vuex'
import { Issue } from '@/types'
import { IssuesManagerModule } from '@/helpers/IssuesManager/index'
import Vue from 'vue'
const form:IssuesManagerModule.CreateEditIssueArgs = {
  id: null,
  title: '',
  status: '',
  description: ''
}
export default Vue.extend({
  name: 'SingleIssuePage',
  components: { },
  data () {
    return {
      form,
      editId: null,
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved', 'production']
    }
  },
  computed: {
    rules () {
      return {
        title: [
          { required: true, message: this.l10n.required, trigger: 'blur' },
          { min: 5, max: 256, message: this.l10n.minMax, trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.l10n.required, trigger: 'change' }
        ],
        description: [
          { required: true, message: this.l10n.required, trigger: 'blur' }
        ]
      }
    },
    l10n () {
      return localization[this.$lang]
    },
    getMode () {
      return this.editId ? 'edit' : 'create'
    },
    headerText () {
      return this.getMode === 'edit' ? this.l10n.editHeaderText + this.editId : this.l10n.createHeaderText
    }
  },
  methods: {
    ...mapActions('issues', [
      'createEditIssue'
    ]),
    getIssueId ():boolean {
      const path = safeCopyObj(this.$route.path)
      const title = path.split('/').pop()
      const maybeNumber = Number(title)
      const isNumber = !isNaN(maybeNumber)
      if (isNumber) this.editId = maybeNumber
      return isNumber
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async submitForm (formName:string):boolean {
      let isValid:boolean

      this.$refs[formName].validate(valid => {
        isValid = valid
      })
      if (!isValid) return false
      await this.saveFormData()
      return true
    },

    async saveFormData () {
      const issue = await this.createEditIssue({ form: this.form })
      if (!issue || issue.id) this.$router.push({ path: '/kanban' })
    }
  },
  mounted () {
    const hasId = this.getIssueId()
    if (hasId)console.log('The page is in edit mode')
  }
})
</script>

<style scoped lang="scss" src="./style.scss" />
