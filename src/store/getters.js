const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  //
  menus: state => state.app.menus,
}

export default getters
