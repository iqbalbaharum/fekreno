import Locker from './../../models/Locker'

const locker = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllLockers() {
      return new Promise((resolve, reject) => {
        this.$repository.locker.listing()
          .then(res => {
            Locker.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddLocker({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.locker.create(data)
          .then(res => {
            Locker.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		}
	}
}

export default locker