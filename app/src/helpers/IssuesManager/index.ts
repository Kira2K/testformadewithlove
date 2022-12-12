import { Issue } from '@/types'
import axios from 'axios'
export module IssuesManagerModule {
  export interface CreateEditIssueArgs extends Omit<Issue, 'id'>{
    id?: Maybe<Issue['id']>,
  }
  export interface IssuesManagerConstructorInterface extends CreateEditIssueArgs{
  id?:Maybe<Issue['id']>
  status: Issue['status']
  title:Issue['title']
  description: Issue['description']
  errorFunc: ErrorFunc
  }
  export interface findIssueByIdArgs {
    id: Issue['id']
    errorFunc: ErrorFunc
  }
  export interface deleteIssueByIdArgs extends IssuesManagerModule.findIssueByIdArgs {
    status: Issue['status']
  }
}

/**
 * @class IssuesManager
 * @public createEditIssue
 * @public findIssueById
 * @public deleteIssueById
 * @private isEditMode
 * @private errorText
*/
export class IssuesManager implements IssuesManagerModule.IssuesManagerConstructorInterface {
  id?:Maybe<Issue['id']>
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
  }:IssuesManagerModule.IssuesManagerConstructorInterface) {
    if (id) this.id = id
    this.status = status
    this.title = title
    this.description = description
    this.errorFunc = errorFunc
  }

  /**
 * Creates new issue or edit existing one
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

    // Creating process
    try {
      const { data } = await axios[method](this.path, { ...form })
      if (!data || data.name === 'AxiosError') throw Error('Can not find issues')

      return data
    } catch (error:unknown) {
      this.errorFunc(this.errorText)
      console.log(error)
      throw error
    }
  }

  /**
 * Delete existing issue, if issue stage is 'production'
*/
  public static async deleteIssueById ({ id, status, errorFunc }:IssuesManagerModule.deleteIssueByIdArgs):Promise<Maybe<Issue['id']>> {
    const issuesManager = new IssuesManager({ id, title: '', status, description: '', errorFunc })
    let errorText = 'Can not delete Issue with id === ' + id
    try {
      if (status !== 'production') {
        errorText = 'May delete issues only with "Production" status'
        throw Error(errorText)
      }
      const { data } = await axios.delete(issuesManager.path)
      if (!data || data.name === 'AxiosError') throw Error(errorText)

      return id
    } catch (error:unknown) {
      issuesManager.errorFunc(errorText)
      console.log(error)
      throw error
    }
  }

  /**
 * Find existing issue by it's unique id, @returns the Issue
*/
  public static async findIssueById ({ id, errorFunc }:IssuesManagerModule.findIssueByIdArgs):Promise<Maybe<Issue>> {
    const issuesManager = new IssuesManager({ id, title: '', status: '', description: '', errorFunc })
    const errorText = 'Can not find Issue with Id === ' + id
    try {
      const { data } = await axios.get(issuesManager.path)
      if (!data || data.name === 'AxiosError') throw Error('errorText')

      return data
    } catch (error:unknown) {
      issuesManager.errorFunc(errorText)
      console.log(error)
      throw error
    }
  }

  /**
 * get basic path for issues manilupating
*/
  private get path ():string {
    const api = (process.env.VUE_APP_BACKEND_ADDR ?? '') + 'issues'
    const path = api + (this.isEditMode ? '/' + this.id : '')
    return path
  }

  /**
 * get the class mode based on "id" prop existing
*/
  private get isEditMode ():boolean {
    const isIdExist = (id: Maybe<Issue['id']>):id is Issue['id'] => {
      return !!<Issue['id']>id
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
