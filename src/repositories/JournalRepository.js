import Repository from './Repository'
import Journal from './../models/Journal'
import datasource from '../datasources/baljs-rest-api'

export default class JournalRepository extends Repository {
  constructor () {
    super(Journal, datasource)
  }
}
