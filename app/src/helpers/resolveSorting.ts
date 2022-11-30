export const resolveSorting = ({ sortKey, sortDirection }:{sortKey:Maybe<string>, sortDirection: Maybe<string>}):string | never[] => {
  // return empty if wrong/null data
  let resolvedSortDirection = sortDirection
  if (!sortKey || !resolvedSortDirection || resolvedSortDirection === null) return []

  // resolve sorting key
  const resolvedSortKey = sortKey.includes(' ') ? sortKey.split(' ').join('","') : sortKey

  // resolve sorting direction
  resolvedSortDirection = resolvedSortDirection === 'ascending' ? 'aasc' : 'adesc'
  return `["${resolvedSortKey}","${resolvedSortDirection}"]`
  // JSON.stringify([resolvedSortKey, resolvedSortDirection])
}
export default resolveSorting
