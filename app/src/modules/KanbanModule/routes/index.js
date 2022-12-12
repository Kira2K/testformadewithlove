import KanbanPage from '@/modules/KanbanModule/pages/kanban'
export default [
  {
    path: '/kanban',
    name: 'kanban',
    component: KanbanPage,
    meta: {
      auth: true,
      icon: 'Kanban',
      mainMenu: true,
      favoriteCards: false,
      menuItemsCards: false,
      selected: false,
      disabled: false,
      title: {
        ru: 'Канбан',
        en: 'kanban'
      }
    }
  }
]
