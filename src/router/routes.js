import MainLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'session',
        meta: {
          title: 'Session Management',
          roles: []
        },
        component: () => import('pages/Session.vue')
      }
    ]
  },

  {
    path: '/login',
    meta: {
      title: 'Login',
      roles: []
    },
    component: () => import('pages/Auth/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove i
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
