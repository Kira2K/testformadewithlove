import resolveSorting from './resolveSorting.ts'

const sortKeyFilter = 'product product_type product_group product_class title'
const sortDirectionFilter = 'sasc'
const sortKeyOptionsValue = 'title'
const sortDirectionOptionsValue = 'sasc'
const sortKeyTable = 'product product_type product_group title'
const sortDirectionTable = 'ascending'

describe('resolveSorting tests', () => {
  it('Validate sorting in FilterSelectMulti', () => {
    const sort = resolveSorting({ sortKey: sortKeyFilter, sortDirection: sortDirectionFilter })
    expect(sort).toEqual('["product","product_type","product_group","product_class","title","adesc"]')
  })

  it('Validate sorting in complicatedTable actions', () => {
    const sort = resolveSorting({ sortKey: sortKeyTable, sortDirection: sortDirectionTable })
    expect(sort).toEqual('["product","product_type","product_group","title","aasc"]')
  })
})
