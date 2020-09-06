import Session from '../models/Session'
import datasource from '../datasources/baljs-rest-api'
import Repository from './Repository'

export default class SessionRepository extends Repository {

  constructor () {
    super(Session, datasource)
  }

  async listing() {
    return await this.datasource({
      method: 'get',
      url: `${Session.entity}`
    })
  }
}
