const file = {
  state: {

  },

  mutations: {

  },

  actions: {
    UploadFile({ commit }, files) {
      return new Promise((resolve, reject) => {
        this.$services.file.uploadFile(files)
          .then(res => {
            resolve(res.data.files.file[0].providerResponse.location)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  }
}

export default file
