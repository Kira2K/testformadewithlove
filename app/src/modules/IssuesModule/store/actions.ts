import { Issue, ChangeIssueStatusByIdArg } from '@/types'
import { Mutations } from './mutationTypes'
import { safeCopyObj } from '@/helpers/safeCopyObj'
export default {
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
