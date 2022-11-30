import { logoutRedirect } from '../config.json'
import Login from '../pages/auth'
export default [
  {
    path: logoutRedirect,
    name: 'login',
    component: Login
  }
]
