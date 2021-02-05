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
          roles: ['user'],
          color: 'text-grey-5',
          subtitle: ''
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: '/application/:id',
        meta: {
          title: 'Application',
          roles: ['user'],
          sidebar: false,
          icon: 'fas fa-book',
          subtitle: ''
        },
        component: () => import('pages/User/Application.vue')
      },
      // {
      //   path: `/application/${process.env.FEATURED_APP_ID}`,
      //   meta: {
      //     title: 'TSA Application',
      //     roles: ['user'],
      //     sidebar: true,
      //     icon: 'fas fa-star',
      //     color: 'text-amber-12',
      //     subtitle: 'Opening for cohort 3'
      //   },
      //   component: () => import('pages/User/Application.vue')
      // },
      {
        path: '/projects',
        meta: {
          title: 'Projects',
          roles: ['user'],
          sidebar: true,
          icon: 'fas fa-code',
          color: 'text-grey-5',
          subtitle: ''
        },
        component: () => import('pages/User/Projects.vue')
      },
      {
        path: '/project/:id',
        meta: {
          title: 'Project',
          roles: ['user'],
          sidebar: false,
          icon: 'fas fa-code',
          color: 'text-grey-5',
          subtitle: ''
        },
        component: () => import('pages/User/Project.vue')
      },
      {
        path: '/repository/:id',
        meta: {
          title: 'Repository',
          roles: ['user'],
          sidebar: false,
          icon: 'fas fa-code',
          color: 'text-grey-5',
          subtitle: ''
        },
        component: () => import('pages/User/Repository.vue')
      },
      {
        path: '/applications',
        meta: {
          title: 'Applications',
          roles: ['user'],
          sidebar: true,
          icon: 'fas fa-book',
          subtitle: ''
        },
        component: () => import('pages/User/Applications.vue')
      },

      {
        path:'/policy',
        meta:{
          title:'Privacy Policy',
          roles:[],
          sidebar: true,
          icon:'fas fa-exclamation-circle'
        },   
      component: () => import('pages/User/Privacy.vue')
   },

      {
        path: '/journal',
        meta: {
          title: 'Journals',
          roles: ['cohort'],
          sidebar: true,
          icon: 'fas fa-book'
        },
        component: () => import('pages/User/Journal.vue')
      },
      {
        path: '/material',
        meta: {
          title: 'Learning Materials',
          roles: ['cohort'],
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
        path: '/admin/application',
        meta: {
          title: 'Application Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Application.vue')
      },
      {
        path: '/admin/journals',
        meta: {
          title: 'Cohort Journals',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Tab/Journal.vue')
      },
      {
        path: '/admin/materials',
        meta: {
          title: 'Cohort Materials',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Tab/Material.vue')
      },
      {
        path: '/admin/application/:id',
        meta: {
          title: 'Application',
          roles: ['admin', 'master'],
          sidebar: false,
          icon: 'school'
        },
        component: () => import('pages/Tab/Application.vue')
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
      },
      {
        path: '/admin/tags',
        meta: {
          title: 'Tags Management',
          roles: ['admin', 'master'],
          sidebar: true,
          icon: 'school'
        },
        component: () => import('pages/Tags.vue')
      },
      {
        path: `admin/participants/:id`,
        meta: {
          roles: ['admin'],
          sidebar: false,
        },
        component: () => import('pages/Tab/Participants.vue')
      },
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
