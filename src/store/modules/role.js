import Role from './../../models/Role'

const zone = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllRoles() {
      return new Promise((resolve, reject) => {
        this.$repository.role.listing()
          .then(res => {
            Role.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddRole({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.role.create(data)
          .then(res => {
            Role.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteRole({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.role.delete(id)
          .then(res => {
            Role.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		}
	}
}

export default zone