import Calendar from '../../models/Calendar'

const calendars = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllCalendars() {

      let filter = {
        include: [
          {
            relation: 'user',
            scope: {
              include: [
                { relation: 'profile' }
              ]
            }
          }
        ]
      }

      return new Promise((resolve, reject) => {
        this.$repository.calendar.listing(filter)
          .then(res => {
            Calendar.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddCalendar({ commit }, data) {
			return new Promise((resolve, reject) => {
        this.$repository.calendar.create(data)
          .then(res => {
            Calendar.insert({ data: res.data })
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

export default calendars