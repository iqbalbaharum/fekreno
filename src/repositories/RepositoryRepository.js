import Repository from './Repository'
import RepositoryM from './../models/Repository'
import datasource from '../datasources/baljs-rest-api'

export default class RepositoryRepository extends Repository {
  constructor () {
    super(RepositoryM, datasource)
  }

  async getNotes(id, filter) {
    return datasource({
      method: 'get',
      url: `repositories/${id}/notes`,
      params: {
        filter: filter
      }
    })
  }

  async getTagsRepo(id){
    return datasource({
      method:'get',
      url: `repositories/${id}/tags`,
    })
  }

  async createNote(id, fromUserId, toUserId, text) {
    return datasource({
      method: 'post',
      url: `repositories/${id}/notes`,
      data: {
        fromUserId: fromUserId,
        toUserId: toUserId,
        text: text
      }
    })
  }
  
  async assignTagsRepo(repoId, tagsId) {
    return datasource({
      method: 'post',
      url: `repositories/${repoId}/tags`,
      data:{
        tagsId: tagsId
      }
    })
  }

}
