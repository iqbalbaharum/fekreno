import Journal from './../../models/Journal'

const journal = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllJournals() {
      return new Promise((resolve, reject) => {
        let filter = {
          order: ["createdAt DESC"],
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