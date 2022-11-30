
export const getUserRightsByRouteName = ({ routeName, roles }) => {
  const obj = {
    read: true,
    write: true
  }
  if (roles.includes('admin')) return obj
  const roleByRouteName = routeName + '-'
  if (!roles.includes(roleByRouteName + 'write')) obj.write = false
  if (!roles.includes(roleByRouteName + 'read')) obj.read = false
  return obj
}
