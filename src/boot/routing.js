import { getToken } from './../datasources/localstorage.storage'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, store, Vue }) => {

  // URLs which gonna be public access
  const whiteListURL = ['/login', '/register', '/terms', '/policy']

  router.beforeEach( async(to, from, next) => {
    const routes = router.options.routes.filter(element => element.path === '/');
    if(getToken(process.env.MAIN_BE_TOKEN)) {

      if(to.path === '/login') {
        next({ path: '/' })
      } else {
        if(store.getters.roles.length === 0) {

          try {
            await store.dispatch('GetInfo')
            let links = []

            const routes = router.options.routes.filter(element => element.path === '/')

            if(routes.length === 1) {
              routes[0].children.forEach(route => {
                if(route.meta.sidebar) {

                  if(store.getters.roles.includes('master')) {
                    links.push(route)
                  } else {
                    if(route.meta.roles.length) {
                      if(route.meta.roles.some(element => store.getters.roles.includes(element))) {
                        links.push(route)
                      }
                    } else {
                      links.push(route)
                    }
                  }
                }
              })
            }

            store.dispatch('SetMenu', links)

            next({ ...to, replace: true })
          } catch(err) {
            console.log(err)
            store.dispatch('Logout')
                .then(() => {
                  console.log('logout')
                  next({ path: '/login' })
                })
          }

        } else {
          next()
        }

      }
    } else {
      const routes = router.options.routes.filter(element => element.meta.access === 'public')
      let publicRoutes = []
      routes.forEach(route => {
        if(route.children) {
          route.children.forEach(childRoute => {
            publicRoutes.push(route.path + childRoute.path)
          })
        } else {
          publicRoutes.push(route.path)
        }
      })

      if (publicRoutes.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }

  })
}
