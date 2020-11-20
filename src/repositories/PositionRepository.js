import Repository from './Repository'
import Position from './../models/Position'
import datasource from '../datasources/baljs-rest-api'

export default class PositionRepository extends Repository {
  constructor () {
    super(Position, datasource)
  }
}
