import Repository from './Repository'
import Tags from '../models/Tag'
import datasource from '../datasources/baljs-rest-api'

export default class TagsRepository extends Repository {
  constructor () {
    super(Tags, datasource)
  }
}