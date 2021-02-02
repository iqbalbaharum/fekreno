import datasource from '../datasources/baljs-rest-api'

export default class FileService {
  
  async uploadFile(file) {
    const formData = new FormData()
    formData.append('file', file)

    return await datasource({
      method: 'post',
      url: '/containers/upload',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
  }
}
