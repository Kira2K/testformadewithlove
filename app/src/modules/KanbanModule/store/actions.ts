import { Mutations } from './mutationTypes'
import { Stage } from '@/types'
import axios from 'axios'
export default {
  async fetchStages ({ commit, dispatch }):Promise<Maybe<Stage[]>> {
    const backAddr = process.env.VUE_APP_BACKEND_ADDR

    const path = backAddr + 'stages'
    try {
      const { data } = await axios.get(path, {
      })
      if (!data || data.name === 'AxiosError') throw Error('Can not find issues')

      commit(Mutations.SET_STAGES, data)

      return data
    } catch (error:unknown) {
      console.log(error)
      dispatch('$setShowServerError', true, { root: true })
    }
  }

}
