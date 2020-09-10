import Repository from './Repository'
import Zone from './../models/Zone'
import datasource from '../datasources/baljs-rest-api'

export default class ZoneRepository extends Repository {
  constructor () {
    super(Zone, datasource)
  }
}
