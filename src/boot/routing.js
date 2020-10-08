import { getToken } from './../datasources/localstorage.storage'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, store, Vue }) => {

  function hasPermission(roles, permissionRoles) {
     if(!permissionRoles) return true

    return roles.some(role => permissionRoles.indexOf(role) >= 0)
  }

  // URLs which gonna be public access
  const whiteListURL = ['/login', '/register']

  router.beforeEach( async(to, from, next) => {

    if(getToken(process.env.MAIN_BE_TOKEN)) {

      if(to.path === '/login') {
        next({ path: '/' })
      } else {
        if(store.getters.roles.length === 0) {

          try {
            await store.dispatch('GetInfo')
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
      if (whiteListURL.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }

  })
}
