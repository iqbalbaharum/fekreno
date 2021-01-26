import Tags from '../../models/Tag';

const tags = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllTag() {
      return new Promise((resolve, reject) => {
        this.$repository.tags.listing()
          .then(res => {
            Tags.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddTag({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.tags.create(data)
          .then(res => {
            Tags.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteTag({ commit }, id) {
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