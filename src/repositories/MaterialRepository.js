import Repository from './Repository'
import Material from './../models/Material'
import datasource from '../datasources/baljs-rest-api'

export default class MaterialRepository extends Repository {
  constructor () {
    super(Material, datasource)
  }
}
