import IssuesPage from '@/modules/IssuesModule/pages/issues'

export default [
  {
    path: '/issues',
    name: 'issues',
    component: IssuesPage,
    meta: {
      auth: true,
      icon: 'Issues',
      mainMenu: true,
      favoriteCards: false,
      menuItemsCards: false,
      selected: false,
      disabled: false,
      roles: ['admin', 'issues_read'],
      title: {
        ru: 'Задачи',
        en: 'Issues'
      }
    }
  }
]
