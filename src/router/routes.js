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
        path: '/projects',
        meta: {
          title: 'Projects',
          roles: ['user'],
          sidebar: true,
          icon: 'fas fa-book'
        },
        component: () => import('pages/User/Projects.vue')
      },
      {
        path: '/project/:id',
        meta: {
          title: 'Project',
          roles: ['user'],
          sidebar: false,
          icon: 'fas fa-book'
        },
        component: () => import('pages/User/Project.vue')
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
        path: '/admin/environment',
        meta: {
          title: 'Environment Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Environment.vue')
      },
      {
        path: '/admin/project',
        meta: {
          title: 'Project Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Project.vue')
      },
      {
        path: '/admin/position',
        meta: {
          title: 'Position Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Position.vue')
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
