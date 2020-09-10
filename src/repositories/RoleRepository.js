import Repository from './Repository'
import Role from './../models/Role'
import datasource from '../datasources/baljs-rest-api'

export default class RoleRepository extends Repository {
  constructor () {
    super(Role, datasource)
  }
}
