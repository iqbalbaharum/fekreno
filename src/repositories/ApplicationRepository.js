import Repository from './Repository'
import Application from './../models/Application'
import datasource from '../datasources/baljs-rest-api'

export default class ApplicationRepository extends Repository {
  constructor () {
    super(Application, datasource)
  }
}
