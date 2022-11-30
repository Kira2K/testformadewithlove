import MainPage from '@/modules/MainModule/pages/main'

export default [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    meta: {
      auth: true,
      icon: 'StarFilled',
      mainMenu: true,
      favoriteCards: false,
      menuItemsCards: false,
      selected: false,
      disabled: false,
      title: {
        ru: 'Домашняя страница',
        en: 'Home page'
      }
    }
  }
]
