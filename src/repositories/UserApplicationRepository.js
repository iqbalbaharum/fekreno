import Repository from './Repository'
import UserApplication from './../models/UserApplication'
import datasource from '../datasources/baljs-rest-api'

export default class UserApplicationRepository extends Repository {
  constructor () {
    super(UserApplication, datasource)
  }
}
