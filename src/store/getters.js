const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  mobile: state => state.user.mobile,
  name: state => state.user.name,
  email: state => state.user.email,
  //
  menus: state => state.app.menus,
}

export default getters
