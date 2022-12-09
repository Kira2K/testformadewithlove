import { Stage } from './Stage'

export interface Issue {
  id: number,
  status: Stage,
  title: string,
  description: string
}
