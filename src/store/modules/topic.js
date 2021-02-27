import Topic from 'src/models/Topic'
import Notes from 'src/models/Note'
import TopicNotes from 'src/models/TopicNotes'

const topics = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllTopics() {
      return new Promise((resolve, reject) => {
        
        let filter = {
          order: ['createdAt DESC'],
          include: [
            {
              relation: 'user'
            }
          ]
        }

        this.$repository.topic.listing(filter)
          .then(res => {
            Topic.insert(res)
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

    GetTopicById({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.topic.getById(id)
          .then(res => {
            Topic.insert(res)
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddTopic({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.topic.create(data)
          .then(res => {
            Topic.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteTopic({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.topic.delete(id)
          .then(res => {
            Topic.insert(res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
		},

    AddNotesToTopic({ rootState }, data) {
      return new Promise(async (resolve, reject) => {
        data.fromUserId = rootState.user.userId
        
        let id = data.id
        delete data.id

        this.$repository.topic.postNotes(id, data)
          .then(res => {
            Topic.insert(res)
            Notes.insert(res)
            TopicNotes.insert({
              data: {
                topicId: id,
                noteId: res.data.id
              }
            })
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    GetTopicNotes({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        this.$repository.topic.getNotes(id)
          .then(async res => {
            Notes.insert(res)
            
            let data = res.data

            for (let note of data) {
              await TopicNotes.insert({
                data: {
                  topicId: id,
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
    }
	}
}

export default topics