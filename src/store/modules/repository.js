import Note from 'src/models/Note'
import Repository from './../../models/Repository'
import RepositoryNote from './../../models/RepositoryNote'

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
    },

    GetRepositoryNote({ commit }, id) {
      return new Promise(async (resolve, reject) => {

        let filter = {
          include: [{ relation: "toUser" }, { relation: "fromUser" }]
        }

        this.$repository.repository.getNotes(id, filter)
          .then(async res => {

            Note.insert(res)

            let data = res.data

            for (let note of data) {
              await RepositoryNote.insert({
                data: {
                  repositoryId: id,
                  noteId: note.id
                }
              })
            }

            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    AddRepositoryNote({ rootState }, data) {
      data.from = rootState.user.userId
      console.log(data)
      return new Promise((resolve, reject) => {
        this.$repository.repository.createNote(data.id, data.from, data.to, data.text)
          .then(res => {
            Note.insert(res.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
	}
}

export default repo