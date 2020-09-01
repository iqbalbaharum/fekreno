
const app = {
  state: {
    menus: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    SetMenu({ commit }, menus) {
      commit('SET_MENUS', menus)
    }
  }
}

export default app
