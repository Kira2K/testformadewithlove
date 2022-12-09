import { Issue } from '@/types'
import axios from 'axios'
export module IssuesManagerModule {
  export interface CreateEditIssueArgs extends Omit<Issue, 'id'>{
    id?: number,
  }
  export interface IssuesManagerConstructorInterface extends CreateEditIssueArgs{
    id?: Issue['id'] | undefined
  status: Issue['status']
  title:Issue['title']
  description: Issue['description']
  errorFunc: ErrorFunc
  }
}

/**
 * @class IssuesManager
 * @public createEditIssue
 * @private isEditMode
 * @private errorText
*/
export class IssuesManager implements IssuesManagerModule.IssuesManagerConstructorInterface {
  id?:Issue['id'] | undefined
  status:Issue['status']
  title:Issue['title']
  description: Issue['description']
  errorFunc:ErrorFunc

  constructor ({
    id,
    status,
    title,
    description,
    errorFunc
  }) {
    if (id) this.id = id
    this.status = status
    this.title = title
    this.description = description
    this.errorFunc = errorFunc
  }

  /**
 * Main function, which creates new issue or edit existing one
*/
  public async createEditIssue ():Promise<Maybe<Issue>> {
    const isEditMode = this.isEditMode
    const form:IssuesManagerModule.CreateEditIssueArgs = {
      status: this.status,
      title: this.title,
      description: this.description
    }
    // State initialization
    const id = this.id
    if (isEditMode && id) form.id = id
    const method = isEditMode ? 'put' : 'post'
    const api = process.env.VUE_APP_BACKEND_ADDR + 'issues'
    const path = api + (isEditMode ? '/' + id : '')

    // Creating process
    try {
      const { data } = await axios[method](path, { ...form })
      if (!data || data.name === 'AxiosError') throw Error('Can not find issues')

      return data
    } catch (error:unknown) {
      this.errorFunc(this.errorText)
      console.log(error)
    }
  }

  /**
 * get the class mode based on "id" prop existing
*/
  private get isEditMode ():boolean {
    const isIdExist = (id: Issue['id']| undefined):id is Issue['id'] => {
      return (<Issue['id']>id) !== undefined
    }
    return isIdExist(this.id)
  }

  /**
 * returns default error text, based on class mode
*/
  private get errorText ():string {
    return this.isEditMode ? 'Can not edit Issue with Id === ' + this.id : 'Can not create new issue'
  }
}
