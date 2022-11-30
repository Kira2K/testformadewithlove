export default class UIService {
  /**
   * Валидировать элемент
   * @param index
   * @param tag
   * @returns {HTMLHtmlElement|undefined}
   */
  static validateHtml (index = 0, tag = 'html') {
    return document.getElementsByTagName(tag)[index] ?? undefined
  }

  /**
   * Установить тему
   * @param style
   * @returns {string}
   */
  static setThemeStyle (style) {
    this.validateHtml().classList.remove('dark')
    this.validateHtml().classList.remove('light')
    this.validateHtml().classList.add(style)
    return this.validateHtml()?.classList[0]
  }
}
