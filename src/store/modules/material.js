import Material from './../../models/Material'

const material = {
	state: {

	},

	mutations: {

	},

	actions: {
		GetAllMaterials() {
      return new Promise((resolve, reject) => {
        
        let filter = {
          order: ["createdAt DESC"],
          include: [
            {
              relation: "user"
            }
          ]
        }
        
        this.$repository.material.listing(filter)
          .then(res => {
            Material.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},
		
		AddMaterial({ commit, rootState }, data) {
			return new Promise((resolve, reject) => {
        data.userId = rootState.user.userId
        this.$repository.material.create(data)
          .then(res => {
            Material.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
		},

		DeleteMaterial({ commit }, id) {
			return new Promise(async (resolve, reject) => {
        this.$repository.material.delete(id)
          .then(res => {
            Material.delete(id)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    UpdateMaterial({ commit }, data) {
      return new Promise((resolve, reject) => {
        let id = data.materialId
        delete data.materialId

        this.$repository.material.updateById(id, data)
          .then(res => {
            Material.update({ where: id, data: data })
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

export default material