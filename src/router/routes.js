export const moduleRouter = {
  label: '素材管理',
  title: '素材管理',
  name: 'modules',
  path: '/modules',
  icon: 'router-module',
  children: [
    {
      path: '/modules/banner',
      name: 'banner',
      label: 'Banner素材',
      title: 'Banner素材',
      role: ['999'],
      components: {
        ContentRouter: () => import('../components/modules/Banner')
      }
    },
    {
      path: '/modules/entrance',
      name: 'entrance',
      label: 'Entrance素材',
      title: 'Entrance素材',
      role: ['1', '999'],
      components: {
        ContentRouter: () => import('../components/modules/Entrance')
      }
    }
  ]
}

export const editorRouter = {
  label: '编辑器管理',
  title: '编辑器管理',
  name: 'editor',
  path: '/editor',
  icon: 'router-editor',
  children: [
    {
      path: '/editor/banner',
      name: 'banner',
      label: 'Banner编辑器',
      title: 'Banner编辑器',
      role: ['999'],
      components: {
        ContentRouter: () => import('../components/editor/Banner')
      }
    },
    {
      path: '/editor/entrance',
      name: 'entrance',
      label: 'Entrance编辑器',
      title: 'Entrance编辑器',
      role: ['999'],
      components: {
        ContentRouter: () => import('../components/editor/Entrance')
      }
    }
  ]
}

export const routes = [
  moduleRouter,
  editorRouter
]