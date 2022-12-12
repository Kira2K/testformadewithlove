import { IssuesManager } from './'
/**
 * @jest-environment node
 */
let afterCreateId:number
describe('Tests for IssuesManager', () => {
  const errorFunc = (text) => text
  const unexistedId = 1000000

  it('standart create', async () => {
    const createForm = {
      id: null,
      title: 'New Issue for test',
      status: 'in-progress',
      description: 'Description for test issue',
      errorFunc
    }
    const issuesManager = new IssuesManager({
      ...createForm
    })
    const createdIssue = await issuesManager.createEditIssue()
    const id = createdIssue?.id
    afterCreateId = id as number

    expect(createdIssue).toEqual({
      id,
      title: 'New Issue for test',
      status: 'in-progress',
      description: 'Description for test issue'
    })
  })

  it('standart edit', async () => {
    const editForm = {
      id: afterCreateId,
      title: 'Edit Issue for test',
      status: 'production',
      description: 'Edit Description for test issue',
      errorFunc
    }
    const issuesManager = new IssuesManager({
      ...editForm
    })
    expect(await issuesManager.createEditIssue()).toEqual({
      id: afterCreateId,
      title: 'Edit Issue for test',
      status: 'production',
      description: 'Edit Description for test issue'
    })
  })

  test('crushed edit', async () => {
    const editFormForCrush = {
      id: unexistedId,
      title: 'Edit Issue for test',
      status: 'production',
      description: 'Edit Description for test issue',
      errorFunc
    }
    const issuesManager = new IssuesManager({
      ...editFormForCrush
    })
    await expect(issuesManager.createEditIssue()).rejects.toThrow()
  })

  it('standart find', async () => {
    expect(await IssuesManager.findIssueById({
      id: afterCreateId,
      errorFunc
    })).toEqual({
      id: afterCreateId,
      title: 'Edit Issue for test',
      status: 'production',
      description: 'Edit Description for test issue'
    })
  })

  test('crushed find', async () => {
    await expect(IssuesManager.findIssueById({
      id: unexistedId,
      errorFunc
    })).rejects.toThrow()
  })

  test('crushed delete due to incorret status', async () => {
    await expect(IssuesManager.deleteIssueById({
      id: afterCreateId,
      errorFunc,
      status: 'any status except production'
    })).rejects.toThrow('May delete issues only with "Production" status')
  })

  it('standart delete with correct status of issue', async () => {
    expect(await IssuesManager.deleteIssueById({
      id: afterCreateId,
      errorFunc,
      status: 'production'
    })).toEqual(afterCreateId)
  })

  test('crushed delete due to unexistedId', async () => {
    await expect(IssuesManager.deleteIssueById({
      id: unexistedId,
      errorFunc,
      status: 'production'
    })).rejects.toThrow()
  })
})
