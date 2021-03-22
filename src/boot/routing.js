import { getToken } from './../datasources/localstorage.storage';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, store, Vue }) => {
  router.beforeEach(async (to, from, next) => {
    if (getToken(process.env.MAIN_BE_TOKEN)) {
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        if (store.getters.roles.length === 0) {
          try {
            await store.dispatch('GetInfo');
            let links = [];
            links['sidebar'] = [];
            links['footer'] = [];
            links['admin'] = [];

            const routes = router.options.routes.filter(
              element => element.path === '/'
            );
            routes.forEach(ro => {
              ro.children.forEach(route => {
                switch (route.meta.position) {
                  case 'sidebar':
                    if (store.getters.roles.includes('master')) {
                      links['sidebar'].push(route);
                    } else {
                      if (route.meta.roles.length) {
                        if (
                          route.meta.roles.some(element =>
                            store.getters.roles.includes(element)
                          )
                        ) {
                          links['sidebar'].push(route);
                        }
                      } else {
                        links['sidebar'].push(route);
                      }
                    }
                    break;
                  case 'footer':
                    links['footer'].push(route);
                    break;
                  case 'admin':
                    if (store.getters.roles.includes('master')) {
                      links['admin'].push(route);
                    } else {
                      if (route.meta.roles.length) {
                        if (
                          route.meta.roles.some(element =>
                            store.getters.roles.includes(element)
                          )
                        ) {
                          links['admin'].push(route);
                        }
                      } else {
                        links['admin'].push(route);
                      }
                    }
                    break;
                }
              });
            });

            store.dispatch('SetMenu', links);

            next({ ...to, replace: true });
          } catch (err) {
            console.log(err);
            store.dispatch('Logout').then(() => {
              console.log('logout');
              next({ path: '/login' });
            });
          }
        } else {
          next();
        }
      }
    } else {
      const routes = router.options.routes.filter(
        element => element.meta.access === 'public'
      );

      let publicRoutes = [];
      routes.forEach(route => {
        if (route.children) {
          route.children.forEach(childRoute => {
            let r = { ...childRoute };
            r.path = childRoute.path;
            publicRoutes.push(r);
          });
        } else {
          publicRoutes.push(route);
        }
      });

      let paths = publicRoutes.map(e => e.path);

      //arrange menu
      let menus = [];
      menus['sidebar'] = publicRoutes.filter(
        e => e.meta.position === 'sidebar'
      );
      menus['footer'] = publicRoutes.filter(e => e.meta.position === 'footer');
      menus['admin'] = publicRoutes.filter(e => e.meta.position === 'admin');

      store.dispatch('SetMenu', menus);

      switch(to.path) {
        case '/':
          next({ path: '/public' });
          break
        default: 
          if (
            to.matched.length &&
            paths.indexOf(to.matched[to.matched.length - 1].path) !== -1
          ) {
            next();
          } else {
            next({ path: '/login' });
          }
          break
      }
    }
  });
};
