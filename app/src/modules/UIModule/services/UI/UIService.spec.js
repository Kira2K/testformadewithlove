/**
 * @jest-environment jsdom
 */
import UIService from './UIService'
describe('UI-service test case', () => {
  it('step 1: Validator can validate html-tag existence. Can be truthy', () => {
    expect(UIService.validateHtml()).toBeTruthy()
  })
  it('step 2: Validator can validate html-tag existence.Can be falsy', () => {
    expect(UIService.validateHtml(1)).toBeFalsy()
  })
  it('step 3: Theme can change theme', () => {
    const theme = 'dark'
    expect(UIService.setThemeStyle(theme)).toEqual(theme)
  })
})
