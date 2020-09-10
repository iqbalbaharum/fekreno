import Repository from './Repository'
import Locker from './../models/Locker'
import datasource from '../datasources/baljs-rest-api'

export default class LockerRepository extends Repository {
  constructor () {
    super(Locker, datasource)
  }
}
