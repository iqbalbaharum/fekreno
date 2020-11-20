import Position from './../../models/Position'

const position = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllPositions() {
      return new Promise((resolve, reject) => {
        this.$repository.position.listing()
          .then(res => {
            Position.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddPosition({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.position.create(data)
          .then(res => {
            Position.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeletePosition({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.position.delete(id)
          .then(res => {
            Position.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		}
	}
}

export default position