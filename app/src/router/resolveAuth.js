const mockedData = {
  name: 'Admin Admin',
  email: 'test@test.ru',
  email_verified: false,
  username: 'admin',
  roles: ['admin']
}
export const resolveAuth = async (to, next, store) => {
  if (!to.meta.auth) {
    next()
    return
  }
  store.dispatch('user/setUserData', mockedData)
  next()
}
