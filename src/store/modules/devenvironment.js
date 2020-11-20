import DevEnvironment from './../../models/DevEnvironment'

const env = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllEnvironments() {
      return new Promise((resolve, reject) => {
        this.$repository.devenvironment.listing()
          .then(res => {
            DevEnvironment.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddEnvironment({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.devenvironment.create(data)
          .then(res => {
            DevEnvironment.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteEnvironment({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.devenvironment.delete(id)
          .then(res => {
            DevEnvironment.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		}
	}
}

export default env