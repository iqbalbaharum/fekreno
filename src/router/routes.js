import MainLayout from 'layouts/MainLayout'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        meta: {
          title: 'My Account',
          sidebar: true,
          icon: 'fas fa-user-circle',
          roles: ['user']
        },
        component: () => import('pages/Index.vue')
      },
      // user
      {
        path: '/track',
        meta: {
          title: 'Tracks',
          sidebar: true,
          icon: 'school',
          roles: ['user']
        },
        component: () => import('pages/Track.vue')
      },
      {
        path: '/track/:id',
        meta: {
          sidebar: false,
          roles: ['user']
        },
        component: () => import('pages/User/Track.vue')
      },
      {
        path: '/session',
        meta: {
          title: 'Session Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school',
          roles: ['admin']
        },
        component: () => import('pages/Session.vue')
      },
      {
        path: '/user',
        meta: {
          title: 'User Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school',
          roles: ['admin']
        },
        component: () => import('pages/User.vue')
      },
      {
        path: '/asset',
        meta: {
          title: 'Asset Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school',
          roles: ['admin']
        },
        component: () => import('pages/Assets.vue')
      },
      {
        path: '/learning',
        meta: {
          title: 'Learning Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Learning.vue')
      },
      {
        path: '/journal',
        meta: {
          title: 'TSA Journal',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Journal.vue')
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
