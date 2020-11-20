import Repository from './Repository'
import RepositoryM from './../models/Repository'
import datasource from '../datasources/baljs-rest-api'

export default class RepositoryRepository extends Repository {
  constructor () {
    super(RepositoryM, datasource)
  }
}
