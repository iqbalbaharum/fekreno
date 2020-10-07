import Track from './../../models/Track'

const track = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllTracks() {
      return new Promise((resolve, reject) => {
        this.$repository.track.listing()
          .then(res => {
            Track.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddTrack({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.track.create(data)
          .then(res => {
            Track.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteTrack({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.track.delete(id)
          .then(res => {
            Track.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    JoinTrack({ state, commit, rootState }, trackId) {
      return new Promise(async (resolve, reject) => {
        this.$repository.track.join(rootState.user.userId, trackId)
          .then(res => {
            Track.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
	}
}

export default track