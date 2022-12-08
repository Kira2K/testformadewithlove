import { Issue, ChangeIssueStatusByIdArg } from '@/types'
import { Mutations } from './mutationTypes'
import { safeCopyObj } from '@/helpers/safeCopyObj'
import axios from 'axios'
export default {
  async fetchIssuesList ({ commit, dispatch }):Promise<Maybe<Issue[]>> {
    const backAddr = process.env.VUE_APP_BACKEND_ADDR

    const path = backAddr + 'issues'
    try {
      const { data } = await axios.get(path, {
      })
      if (!data || data.name === 'AxiosError') throw Error('Can not find issues')

      commit(Mutations.SET_ISSUES, data)

      return data
    } catch (error:unknown) {
      console.log(error)
      dispatch('$setShowServerError', true, { root: true })
    }
  },

  changeIssueStatusById ({ commit, state }, { id, status }:ChangeIssueStatusByIdArg) {
    if (!id || typeof id !== 'number' || isNaN(id)) {
      throw Error('id is not defined or has incorrect type')
    }
    if (!status || typeof status !== 'string') {
      throw Error('status is not defined or has incorrect type')
    }
    const issues:Issue[] = safeCopyObj(state.issues)
    const issue = issues.find(issue => issue.id === id)
    if (!issue) throw Error('no issue with this id found')
    issue.status = status
    commit(Mutations.SET_ISSUES, issues)
  }
}
