import { Issue, ChangeIssueStatusByIdArg } from '@/types'
import { Mutations } from './mutationTypes'
import { safeCopyObj } from '@/helpers/safeCopyObj'
import { IssuesManagerModule, IssuesManager } from '@/helpers/IssuesManager'
import axios from 'axios'
export default {
  async createEditIssue (
    { dispatch },
    { form }:{form: IssuesManagerModule.CreateEditIssueArgs}
  ):Promise<Maybe<Issue>> {
    const { id, status, title, description } = form
    const issuesManager = new IssuesManager({ id, title, status, description, errorFunc: (text) => dispatch('$setTextShowServerError', text, { root: true }) })
    return await issuesManager.createEditIssue()
  },
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

  async changeIssueStatusById ({ dispatch, state, rootGetters }, { id, status }:ChangeIssueStatusByIdArg):Promise<Maybe<Issue>> {
    if (!id || typeof id !== 'number' || isNaN(id)) {
      throw Error('id is not defined or has incorrect type')
    }

    const stages = rootGetters['kanban/getStages']
    if (!status || typeof status !== 'string' || !stages.includes(status)) {
      throw Error('status is not defined or has incorrect type')
    }
    const issues:Issue[] = safeCopyObj(state.issues)
    const issue = issues.find(issue => issue.id === id)
    if (!issue) throw Error('no issue with this id was found')
    issue.status = status

    const issuesManager = new IssuesManager({ ...issue, errorFunc: (text) => dispatch('$setTextShowServerError', text, { root: true }) })
    return await issuesManager.createEditIssue()
  }
}
