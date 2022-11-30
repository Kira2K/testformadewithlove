import * as types from './types/mutations.type'
import router from '@/router'
import UIService from '@/modules/UIModule/services/UI/UIService'
import axios from 'axios'
export default {
  setProcess ({ commit }, value) {
    commit(types.SET_PROCESS, value)
  },

  setUserData ({ commit }, userObj) {
    const { name, roles } = userObj
    commit(types.SET_USER_ID, name)
    commit(types.SET_USER_ROLES, roles)
  }
}
