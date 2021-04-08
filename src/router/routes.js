import MainLayout from 'layouts/MainLayout';
import WebLayout from 'layouts/WebLayout'


const routes = [
  //private
  {
    path: '/',
    component: MainLayout,
    meta: {
      access: 'jwt'
    },
    children: [
      {
        path: '/',
        meta: {
          title: 'My Account',
          position: 'sidebar',
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
          position: '',
          icon: 'fas fa-book',
          subtitle: ''
        },
        component: () => import('pages/User/Application.vue')
      },
      {
        path: '/projects',
        meta: {
          title: 'Projects',
          roles: ['user'],
          position: 'sidebar',
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
          position: '',
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
          position: '',
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
          position: 'sidebar',
          icon: 'fas fa-book',
          subtitle: ''
        },
        component: () => import('pages/User/Applications.vue')
      },

      {
        path: '/journal',
        meta: {
          title: 'Journals',
          roles: ['cohort'],
          position: 'sidebar',
          icon: 'fas fa-book'
        },
        component: () => import('pages/User/Journal.vue')
      },
      {
        path: '/material',
        meta: {
          title: 'Learning Materials',
          roles: ['cohort'],
          position: 'sidebar',
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
          position: 'admin',
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
          position: 'admin',
          icon: 'school',
          roles: ['admin']
        },
        component: () => import('pages/User.vue')
      },
      {
        path: '/general/new',
        meta: {
          position: '',
          icon: 'school',
          roles: ['admin', 'user']
        },
        component: () => import('pages/Forum/New.vue')
      },
      {
        path: '/admin/environment',
        meta: {
          title: 'Environment Management',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Environment.vue')
      },
      {
        path: '/admin/project',
        meta: {
          title: 'Project Management',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Project.vue')
      },
      {
        path: '/admin/application',
        meta: {
          title: 'Application Management',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Application.vue')
      },
      {
        path: '/admin/journals',
        meta: {
          title: 'Cohort Journals',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Tab/Journal.vue')
      },
      {
        path: '/admin/materials',
        meta: {
          title: 'Cohort Materials',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Tab/Material.vue')
      },
      {
        path: '/admin/application/:id',
        meta: {
          title: 'Application',
          roles: ['admin', 'master'],
          position: '',
          icon: 'school'
        },
        component: () => import('pages/Tab/Application.vue')
      },
      {
        path: '/admin/position',
        meta: {
          title: 'Position Management',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Position.vue')
      },
      {
        path: '/admin/tags',
        meta: {
          title: 'Tags Management',
          roles: ['admin', 'master'],
          position: 'admin',
          icon: 'school'
        },
        component: () => import('pages/Tags.vue')
      },
      {
        path: 'admin/participants/:id',
        meta: {
          roles: ['admin'],
          position: ''
        },
        component: () => import('pages/Tab/Participants.vue')
      }
    ]
  },
  // public
  {
    path: '/',
    component: WebLayout,
    meta: {
      access: 'public'
    },
    children: [
      {
        path: '/home',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/Public.vue')
      },
      {
        path: '/general',
        meta: {
          title: 'Forum',
          position: 'sidebar',
          icon: 'school',
          roles: []
        },
        component: () => import('pages/Forum/Topics.vue')
      },
      {
        path: '/general/:id',
        meta: {
          position: '',
          icon: 'school',
          roles: []
        },
        component: () => import('pages/Forum/Topic.vue')
      },
      {
        path: '/policy',
        meta: {
          title: 'Privacy Policy',
          position: 'footer'
        },
        component: () => import('pages/User/Privacy.vue')
      },

      {
        path: '/terms',
        meta: {
          title: 'Terms and Condition',
          position: 'footer'
        },
        component: () => import('pages/User/Terms.vue')
      },
      {
        path: '/profile/:userName',
        meta: {
          title: 'User Account',
          position: ''
        },
        component: () => import('pages/User/Profile.vue')
      },
      {
        path: '/homepage',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/Homepage.vue')
      },
      {
        path: '/TSA',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/TSA.vue')
      },
      {
        path: '/hire',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/Hire.vue')
      },
      {
        path: '/Krenofication',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/Krenofication.vue')
      },
      {
        path: '/Blog',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/Blog/Blog.vue')
      },
      {
        path: '/BlogInner',
        meta: {
          access: 'public',
          sidebar: false
        },
        component: () => import('pages/Website/Blog/BlogInner.vue')
      },
    ]
  },

  {
    path: '/login',
    meta: {
      title: 'Login',
      sidebar: false,
      roles: [],
      access: 'public'
    },
    component: () => import('pages/Auth/Login.vue')
  },
  {
    path: '/register',
    meta: {
      access: 'public',
      sidebar: true
    },
    component: () => import('pages/Auth/Register.vue')
  },
  {
    path: '/public',
    meta: {
      access: 'public',
      sidebar: false
    },
    component: () => import('pages/Website/Public.vue')
  },

  
  

  // Always leave this as last one,
  // but you can also remove i
  {
    path: '*',
    meta: {
      access: 'public',
      sidebar: false
    },
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
