import baseAuth from '@/modules/AuthModule/services/Auth/__depth/baseAuth'

/**
 * @class AuthService
 * @public isAuthSuccess
 * @public accessToken
 * @public refreshToken
 * @public expTime
 * @private getToken
 * @private decodeAccessToken
 * @private convertToExpire
 */
export default class AuthService extends baseAuth {
  constructor (data) {
    super()
    this.data = data
  }

  /**
   * валидация статуса авторизации
   * @returns { boolean }
   */
  isAuthSuccess () {
    return this.data.message === 'SUCCESS' && this.data.data.length > 0
  }

  /**
   * получение токена доступа
   * @returns {string}
   */
  accessToken () {
    return this.getToken('accessToken')
  }

  /**
   * Получение токена обновления
   * @returns {*}
   */
  refreshToken () {
    return this.getToken('refreshToken')
  }

  /**
   * Получение времени протухания
   * @returns {number}
   */
  expTime () {
    const accessToken = this.getToken('accessToken')
    const accessData = this.decodeAccessToken(accessToken)
    return this.convertToExpire(accessData?.exp)
  }

  /**
   * Получения токена исходя из модели ответа API сервиса
   * @param key
   * @param index
   * @returns {*}
   */
  getToken (key, index = 0) {
    return this.data?.data?.[index][key]
  }
}
