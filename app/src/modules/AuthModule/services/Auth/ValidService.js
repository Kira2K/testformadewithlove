import baseAuth from '@/modules/AuthModule/services/Auth/__depth/baseAuth'

export default class validService extends baseAuth {
  constructor (accessToken, data = {}) {
    super()
    this.accessToken = super.decodeAccessToken(accessToken)
    this.data = data
  }

  /**
   * Получить права доступа
   * @returns {array}
   */
  getRoles () {
    return (this.data.data && this.data.data.roles) || []
  }

  /**
   * Получение времени протухания
   * @returns {number}
   */
  expTime () {
    return this.convertToExpire(this.accessToken?.exp)
  }
}
