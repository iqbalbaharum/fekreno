import Journal from './../../models/Journal'
import Comment from './../../models/Comment'

const journal = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllJournals() {
      return new Promise((resolve, reject) => {
        let filter = {
          order: ['createdAt DESC'],
          include: [
            {
              relation: 'project'
            },
            {
              relation: 'user'
            },
            { relation: 'comments' }
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

    UpdateJournal({ commit }, data) {
      return new Promise((resolve, reject) => {
        let id = data.journalId
        delete data.journalId

        this.$repository.journal.updateById(id, data)
          .then(res => {
            Journal.update({ where: id, data: data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    AddJournalComment({ commit, rootState }, data) {
			return new Promise((resolve, reject) => {

        let body = {
          userId: rootState.user.userId,
          comment: data.comment
        }

        this.$repository.journal.createComment(data.journalId, body)
          .then(res => {
            Comment.insert({ data: res.data })
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
