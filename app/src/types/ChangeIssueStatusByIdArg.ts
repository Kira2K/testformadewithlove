import { Issue } from '@/types'
export type ChangeIssueStatusByIdArg = {
  id: Issue['id'],
  status: string
}
