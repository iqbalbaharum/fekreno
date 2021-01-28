import Repository from './Repository'
import Tag from '../models/Tag'
import datasource from '../datasources/baljs-rest-api'

export default class TagRepository extends Repository {
  constructor () {
    super(Tag, datasource)
  }
}
