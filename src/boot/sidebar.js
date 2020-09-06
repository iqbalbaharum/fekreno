// import something here

// Generate sidebar list based on user roles and router configuration

export default async ({ app, router, store }) => {

  let links = []

  const routes = router.options.routes.filter(element => element.path === '/')

  if(routes.length === 1) {
    routes[0].children.forEach(route => {
      if(route.meta.sidebar) {
        links.push(route)
      }
    })
  }

  store.dispatch('SetMenu', links)
}
