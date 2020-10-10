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
      {
        path: '/journal',
        meta: {
          title: 'Journals',
          roles: ['user'],
          sidebar: true,
          icon: 'fas fa-book'
        },
        component: () => import('pages/User/Journal.vue')
      },
      {
        path: '/material',
        meta: {
          title: 'Learning Materials',
          roles: ['user'],
          sidebar: true,
          icon: 'fas fa-stream'
        },
        component: () => import('pages/User/Material.vue')
      },
      // user
      {
        path: '/track',
        meta: {
          title: 'Tracks',
          sidebar: true,
          icon: 'fas fa-folder-open',
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

      //admin
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
        path: '/admin/journal',
        meta: {
          title: 'TSA Journal',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Journal.vue')
      },
      {
        path: '/admin/material',
        meta: {
          title: 'Material Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Material.vue')
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
