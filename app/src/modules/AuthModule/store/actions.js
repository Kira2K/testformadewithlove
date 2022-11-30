import AuthService from '../services/Auth/AuthService'
import ValidService from '../services/Auth/ValidService'
import Config from '../config.json'
import * as types from '../store/types/mutations.type'
import axios from 'axios'

const _api = {
  refresh: Config.endPoints.refresh,
  login: Config.endPoints.login,
  accessToken: Config.endPoints.validate
}

const _apiUrl = (data) => {
  if (data.refreshToken !== undefined) {
    return _api.refresh
  } else if (data.login !== undefined) {
    return _api.login
  } else {
    return _api.accessToken
  }
}

export default {
  async access ({ dispatch, commit, state }, authData) {
    const { data } = await axios.post(_apiUrl(authData), authData)
    const Auth = new AuthService(data)
    if (Auth.isAuthSuccess()) {
      commit(types.SET_ACCESS_TOKEN, Auth.accessToken())
      commit(types.SET_REFRESH_TOKEN, Auth.refreshToken())
      dispatch('validate')
    }
  },
  async validate ({ commit, getters, dispatch }) {
    const access = getters.$accessToken
    const { status, data } = await axios.get(_apiUrl({}), {
      headers: {
        Authorization: access || 'empty'
      }
    })
    const Valid = new ValidService(access, data)
    if (status === 200) {
      commit(types.SET_ACCESS_TOKEN, access)
      commit(types.SET_EXP_ACCESS_TIME, Valid.expTime())
      commit(types.SET_SESSION, true)
      commit(types.SET_ROLES, Valid.getRoles())
    }
  },
  async denyAccess ({ commit }) {
    commit(types.SET_REFRESH_TOKEN, '')
    commit(types.SET_ACCESS_TOKEN, '')
    commit(types.SET_EXP_ACCESS_TIME, null)
    commit(types.SET_SESSION, false)
  },
  actuallyTokenUpdate ({ dispatch, getters }) {
    const Valid = new ValidService(getters.$accessToken)
    if (Valid.expTime() < 10000) {
      dispatch('access', { refreshToken: getters.$refreshToken })
    }
  }
}
