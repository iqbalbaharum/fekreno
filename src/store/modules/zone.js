import Zone from './../../models/Zone'

const zone = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllZones() {
      return new Promise((resolve, reject) => {
        this.$repository.zone.listing()
          .then(res => {
            Zone.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddZone({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.zone.create(data)
          .then(res => {
            Zone.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteZone({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.zone.delete(id)
          .then(res => {
            Zone.delete(id)
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