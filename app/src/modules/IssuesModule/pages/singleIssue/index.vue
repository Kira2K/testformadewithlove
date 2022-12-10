<template>

<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm form">
    <el-row :gutter="20">
      <el-col :span="24">
        <header class="form__header">{{headerText}}</header>
      </el-col>
   </el-row>
   <el-row :gutter="20">
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
            v-for="stage in getStages"
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
        <el-form-item :label="l10n.desc" prop="description">
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
import { IssuesManagerModule, IssuesManager } from '@/helpers/IssuesManager/index'
import Vue from 'vue'
import { Issue } from '@/types'
const form:IssuesManagerModule.CreateEditIssueArgs = {
  id: null,
  title: '',
  status: '',
  description: ''
}
let editId:number
export default Vue.extend({
  name: 'SingleIssuePage',
  components: { },
  data () {
    return {
      form,
      editId
    }
  },
  computed: {
    ...mapGetters('kanban', [
      'getStages'
    ]),
    rules ():Object {
      const l10n = this.l10n
      return {
        title: [
          { required: true, message: l10n.required, trigger: 'blur' },
          { min: 5, max: 256, message: l10n.minMax, trigger: 'blur' }
        ],
        status: [
          { required: true, message: l10n.required, trigger: 'change' }
        ],
        description: [
          { required: true, message: l10n.required, trigger: 'blur' }
        ]
      }
    },
    l10n ():{[key: string]: string} {
      return localization[this.$lang]
    },
    getMode ():string {
      return this.editId ? 'edit' : 'create'
    },
    headerText ():string {
      return this.getMode === 'edit' ? this.l10n.editHeaderText + this.editId : this.l10n.createHeaderText
    }
  },
  methods: {
    ...mapActions('issues', [
      'createEditIssue'
    ]),
    ...mapActions('kanban', [
      'fetchStages'
    ]),
    getIssueId ():Issue['id']|undefined {
      const path = safeCopyObj(this.$route.path)
      const title = path.split('/').pop()
      const maybeNumber = Number(title)
      const isNumber = !isNaN(maybeNumber)
      if (isNumber) this.editId = maybeNumber
      return maybeNumber
    },
    resetForm (formName):void {
      const formRef = this.$refs[formName] as HTMLFormElement|undefined
      formRef?.resetFields()
    },
    async submitForm (formName:string):Promise<boolean> {
      let isValid:boolean = false
      const formRef = this.$refs[formName] as HTMLFormElement|undefined
      await formRef?.validate(valid => {
        isValid = valid
      })
      if (!isValid) return false
      await this.saveFormData()
      return true
    },

    async initIssue ({ id }:{id:Issue['id']}) {
      const issue = await IssuesManager.findIssueById({ id, errorFunc: this.$setTextShowServerError })
      if (!issue) return this.$router.replace({ path: '/issues/create' })
      this.form = issue
    },
    async saveFormData ():Promise<void> {
      const issue = await this.createEditIssue({ form: this.form })
      if (!issue || issue.id) this.$router.push({ path: '/kanban' })
    }
  },
  mounted () {
    this.fetchStages()
    const id = this.getIssueId()
    if (id) this.initIssue({ id })
  }
})
</script>

<style scoped lang="scss" src="./style.scss" />
