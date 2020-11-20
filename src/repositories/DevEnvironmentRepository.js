import Repository from './Repository'
import DevEnvironment from './../models/DevEnvironment'
import datasource from '../datasources/baljs-rest-api'

export default class DevEnvironmentRepository extends Repository {
  constructor () {
    super(DevEnvironment, datasource)
  }
}
