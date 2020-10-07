import Country from './../../models/Country'

const country = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllCountries() {
      return new Promise((resolve, reject) => {

        this.$repository.country.getAll()
          .then(res => {
            Country.insert({ data: res.data })
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

export default country