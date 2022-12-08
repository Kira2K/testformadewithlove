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
          <el-select v-model="form.stages" :placeholder="l10n.stages" class="form__select">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

   <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item :label="l10n.desc" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-col>
   </el-row>

   <el-row :gutter="20">
      <el-col :sm="8" :md="24">
        <el-form-item >
          <div class="form__btn-container">
            <el-button class="form__btn" @click="submitForm('form')">{{l10n.save}}</el-button>
            <el-button class="form__btn" type="danger" @click="resetForm('form')">{{l10n.reset}}</el-button>
          </div>

        </el-form-item>
      </el-col>
   </el-row>
</el-form>
</template>

<script>
import localization from './localization.json'
import { safeCopyObj } from '@/helpers/safeCopyObj'
export default {
  name: 'SingleIssuePage',
  components: { },
  data () {
    return {
      form: {
        title: '',
        stages: '',
        desc: ''
      },
      editId: null
    }
  },
  computed: {
    rules () {
      return {
        title: [
          { required: true, message: this.l10n.required, trigger: 'blur' },
          { min: 5, max: 256, message: this.l10n.minMax, trigger: 'blur' }
        ],
        stages: [
          { required: true, message: this.l10n.required, trigger: 'change' }
        ],
        desc: [
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
    getIssueId () {
      const path = safeCopyObj(this.$route.path)
      const title = path.split('/').pop()
      const maybeNumber = Number(title)
      const isNumber = !isNaN(maybeNumber)
      if (isNumber) this.editId = maybeNumber
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    this.getIssueId()
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
