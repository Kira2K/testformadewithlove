import { Issue, Stage } from '@/types'
export type ChangeIssueStatusByIdArg = {
  id: Issue['id'],
  status: Stage
}
