import IssuesPage from '@/modules/IssuesModule/pages/issues'
import SingleIssuePage from '@/modules/IssuesModule/pages/singleIssue'

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
      title: {
        ru: 'Задачи',
        en: 'Issues'
      }
    },
    children: [
      {
        path: '/issues/:id',
        name: 'singleIssuePage',
        component: SingleIssuePage,
        meta: {
          auth: true,
          icon: 'Issues',
          mainMenu: false,
          favoriteCards: false,
          menuItemsCards: false,
          selected: false,
          disabled: false,
          title: {
            ru: 'Редактирование',
            en: 'Issue editing'
          }
        }
      }
    ]
  }
]
