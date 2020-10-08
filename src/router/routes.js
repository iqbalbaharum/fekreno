import MainLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        meta: {
          sidebar: false
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'session',
        meta: {
          title: 'Session Management',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Session.vue')
      },
      {
        path: 'user',
        meta: {
          title: 'User Management',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/User.vue')
      },
      {
        path: 'asset',
        meta: {
          title: 'Asset Management',
          roles: [],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Assets.vue')
      }

    ]
  },

  {
    path: '/login',
    meta: {
      title: 'Login',
      sidebar: false,
      roles: []
    },
    component: () => import('pages/Auth/Login.vue')
  },


  // {
  //   path: '/first-time-registration',
  //   meta: {
  //     title: 'First Time Registration',
  //     roles: [],
  //     sidebar: false
  //   },
  //   component: () => import('pages/Auth/FirstTimeRegister.vue')
  // },

  {
    path: '/register',
    meta: {
      title: 'Registration',
      roles: ['user'],
      sidebar: false
    },
    component: () => import('pages/Auth/Register.vue')
  },

  // Always leave this as last one,
  // but you can also remove i
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
