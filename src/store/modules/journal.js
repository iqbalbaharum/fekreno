import Journal from './../../models/Journal'
import User from './../../models/User'
import Project from './../../models/Project'

const journal = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllJournals() {
      return new Promise((resolve, reject) => {
        let filter = {
          include: [
            {
              relation: "project"
            },
            {
              relation: "user"
            }
          ]
        }

        this.$repository.journal.listing(filter)
          .then(res => {
            Journal.insert({ data: res.data })

            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    AddJournal({ commit, rootState }, data) {
			return new Promise((resolve, reject) => {
        data.userId = rootState.user.userId
        this.$repository.journal.create(data)
          .then(res => {
            Journal.insert({ data: res.data })
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

export default journal