import Project from './../../models/Project'

const project = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllProjects() {
      return new Promise((resolve, reject) => {
        this.$repository.project.listing()
          .then(res => {
            Project.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddProject({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.project.create(data)
          .then(res => {
            Project.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteProject({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.project.delete(id)
          .then(res => {
            Project.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		}
	}
}

export default project