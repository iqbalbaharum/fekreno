import { getToken } from './../utils/token'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, store, Vue }) => {

  function hasPermission(roles, permissionRoles) {
     if(!permissionRoles) return true

    return roles.some(role => permissionRoles.indexOf(role) >= 0)
  }

  // URLs which gonna be public access
  const whiteListURL = ['/login']

  router.beforeEach((to, from, next) => {

    if(getToken(process.env.MAIN_BE_TOKEN)) {
      next()
    } else {
      if (whiteListURL.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }

  })
}
