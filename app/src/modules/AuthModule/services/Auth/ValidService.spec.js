import successMoc from './__depth/tests/successMoc'
import successRolesMoc from '@/modules/AuthModule/services/Auth/__depth/tests/successRolesMoc'
import ValidService from './ValidService'

describe('ValidService test case', () => {
  const Valid = new ValidService(successMoc.data[0].accessToken, successRolesMoc)
  const Failure = new ValidService(null, {})
  it('step 1: validate expire time method', () => {
    expect(typeof Valid.expTime()).toBe('number')
  })
  it('step 2: validate expire time method if wrong acessToken', () => {
    expect(Failure.expTime()).toBeUndefined()
  })
  it('step 3: Validate access rules if user confirmed', () => {
    expect(Valid.getRoles().length).toEqual(2)
  })
  it('step 4: Empty roles if user not confirmed', () => {
    expect(Failure.getRoles().length).toEqual(0)
  })
})
