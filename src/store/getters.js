const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  //
  menus: state => state.menus.menus,
}

export default getters
