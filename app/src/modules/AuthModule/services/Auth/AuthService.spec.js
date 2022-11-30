import AuthService from './AuthService'
import successMoc from './__depth/tests/successMoc'
import failureMoc from './__depth/tests/failureMoc'

describe('Auth-service test case', () => {
  const AuthSuccess = new AuthService(successMoc)
  const AuthFailure = new AuthService(failureMoc)

  it('step 1: Auth-service validator can be success', () => {
    expect(AuthSuccess.isAuthSuccess()).toBeTruthy()
    expect(typeof AuthSuccess.isAuthSuccess()).toBe('boolean')
  })

  it('step 2: Auth-service validator can be failure', () => {
    expect(AuthFailure.isAuthSuccess()).not.toBeTruthy()
    expect(typeof AuthFailure.isAuthSuccess()).toBe('boolean')
  })

  it('step 3: Auth-service can take access token', () => {
    expect(AuthSuccess.accessToken()).toEqual(successMoc.data[0].accessToken)
    expect(typeof AuthSuccess.accessToken()).toBe('string')
  })

  it('step 4: Auth-service cant take access token if haven`t data', () => {
    expect(AuthFailure.accessToken()).toBeUndefined()
  })

  it('step 5: Auth-service can take refresh token', () => {
    expect(AuthSuccess.refreshToken()).toEqual(successMoc.data[0].refreshToken)
    expect(typeof AuthSuccess.refreshToken()).toBe('string')
  })

  it('step 6: Auth-service cant take refresh token if haven`t data', () => {
    expect(AuthFailure.refreshToken()).toBeUndefined()
  })

  it('step 7: Auth-service can take expire time', () => {
    expect(typeof AuthSuccess.expTime()).toBe('number')
  })

  it('step 8: Auth-service cant take expire time if haven`t data', () => {
    expect(AuthFailure.expTime()).toBeUndefined()
  })
})
