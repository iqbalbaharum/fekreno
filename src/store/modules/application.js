import Application from './../../models/Application'

const application = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllApplications() {
      return new Promise((resolve, reject) => {
        
        let filter = {
          order: ["createdAt DESC"],
          include: [
            {
              relation: "user"
            }
          ]
        }
        
        this.$repository.application.listing(filter)
          .then(res => {
            Application.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddApplication({ commit, rootState }, data) {
			return new Promise((resolve, reject) => {
        data.questions = JSON.stringify(data.questions)
        data.createdby = rootState.user.userId
        this.$repository.application.create(data)
          .then(res => {
            Application.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteApplication({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.application.delete(id)
          .then(res => {
            Application.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    UpdateApplication({ commit }, data) {
      return new Promise((resolve, reject) => {
        let id = data.id
        delete data.id

        this.$repository.application.updateById(id, data)
          .then(res => {
            Application.update({ where: id, data: data })
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

export default application