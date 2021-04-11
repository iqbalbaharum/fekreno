import Repository from './Repository'
import Notification from './../models/Notification'
import datasource from '../datasources/baljs-rest-api'

export default class ActivitesRepository extends Repository {
  constructor () {
    super(Notification, datasource)
  }

  async getUserNotifications() {
    return datasource({
      method: 'get',
      url: `/notifications`
    }) 
  }
}