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

  }
}

export default session
