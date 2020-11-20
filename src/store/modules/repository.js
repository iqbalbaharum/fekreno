import Repository from './../../models/Repository'

const repo = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllRepositories() {
      return new Promise((resolve, reject) => {

        let filter = {
          order: ["createdAt DESC"],
          include: [
            {
              relation: "user"
            }
          ]
        }

        this.$repository.repository.listing(filter)
          .then(res => {
            Repository.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddRepository({ commit, rootState }, data) {
			return new Promise((resolve, reject) => {
        data.userId = rootState.user.userId
        this.$repository.repository.create(data)
          .then(res => {
            Repository.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteRepository({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.repository.delete(id)
          .then(res => {
            Repository.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		}
	}
}

export default repo