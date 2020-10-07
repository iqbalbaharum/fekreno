const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  //
  menus: state => state.app.menus,
}

export default getters
