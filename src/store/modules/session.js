import Session from './../../models/Session'

const session = {
  state: {
  },

  mutations: {

  },

  actions: {

    GetAllSessions () {
      return new Promise((resolve, reject) => {
        this.$repository.session.listing()
          .then(res => {
            Session.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    DeleteSession({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        this.$repository.session.delete(id)
          .then(res => {
            Session.delete(id)

            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }

  }
}

export default session
