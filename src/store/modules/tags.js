import Tag from '../../models/Tag'

const tags = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllTags() {
      return new Promise((resolve, reject) => {
        this.$repository.tags.listing()
          .then(res => {
            Tag.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddTags({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.tags.create(data)
          .then(res => {
            Tag.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteTags({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.tags.delete(id)
          .then(res => {
            Tags.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		}
	}
}

export default tags