import Notification from './../../models/Notification'

const activity = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetUserNotifications() {
      return new Promise((resolve, reject) => {

        this.$repository.activity.getUserNotifications()
          .then(res => {
            Notification.insert({ data: res.data })
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

export default activity