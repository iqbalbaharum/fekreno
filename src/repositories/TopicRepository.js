import Repository from './Repository'
import Topic from '../models/Topic'
import datasource from '../datasources/baljs-rest-api'

export default class TopicRepository extends Repository {
  constructor () {
    super(Topic, datasource)
  }

  async postNotes(id, data) {
    return datasource({
      method: 'post',
      url: `topics/${id}/notes`,
      data
    })
  }

  async getNotes(id) {
    return datasource({
      method: 'get',
      url: `topics/${id}/notes`
    })
  }
}
