import Repository from './Repository'
import Country from './../models/Country'
import datasource from '../datasources/countries'

export default class JournalRepository extends Repository {
  constructor () {
    super(Country, datasource)
  }

  async getAll() {
    return await datasource({
      method: 'get',
      url: `all`,
    })
  }
}
