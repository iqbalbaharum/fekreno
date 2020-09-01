// import something here

// Generate sidebar list based on user roles and router configuration

export default async ({ app, router, store }) => {
  store.dispatch('SetMenu', router.options.routes)
}
