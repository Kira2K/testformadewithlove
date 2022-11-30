export default {
  $accessToken: (state) => state.$accessToken ? state.$accessToken : localStorage.getItem('access'),
  $refreshToken: (state) => state.$refreshToken ? state.$refreshToken : localStorage.getItem('refresh'),
  $expAccessTime: (state) => state.$expAccessTime,
  $session: (state) => state.$session,
  getRoles: (state) => state.roles
}
