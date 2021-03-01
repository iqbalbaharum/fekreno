import Application from './../../models/Application'
import Project from './../../models/Project'
import ApplicationProject from './../../models/ApplicationProject'

const application = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllApplications() {
      return new Promise((resolve, reject) => {

        let filter = {
          order: ['createdAt DESC'],
          include: [
            { relation: 'user' },
            { relation: 'projects' }
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

    GetActiveApplications() {
      return new Promise((resolve, reject) => {

        let filter = {
          order: ['createdAt DESC'],
          include: [
            { relation: 'user' },
            { relation: 'projects' }
          ],
          where: {
            status: 'active'
          }
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

    async GetApplicationProject({ commit }, id) {
      return new Promise((resolve, reject) => {

        this.$repository.application.getApplicationProjects(id)
          .then(res => {

            for (let project of res.data) {
              ApplicationProject.insert({
                data: {
                  applicationId: id,
                  projectId: project.id
                }
              })
            }
            Project.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async AddProjectToApplication({ commit, rootState }, data) {
      let res = await this.$repository.application.linkApplicationProject(data.id, data.projectId)
      return res.data
    },

    async RemoveProjectToApplication({ commit, rootState }, data) {
      let res = await this.$repository.application.unlinkApplicationProject(data.id, data.projectId)
      return res.data
    },

    async ActivateApplication({ commit }, data) {
      let res = await this.$repository.application.activateApplication(data.id)
      return res.data
    },

    async DeactivateApplication({ commit }, data) {
      let res = await this.$repository.application.deactivateApplication(data.id)
      return res.data
    },

    async CloseApplication({ commit }, data) {
      return new Promise((resolve, reject) => {

        this.$repository.application.closeApplication(data.id, data.acceptedIds)
          .then(res => {
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

export default application
