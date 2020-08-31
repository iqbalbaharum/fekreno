import DataSource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import User from './../models/User'

const resource = '/user'

export default class UserReposiitory extends Repository {

  constructor () {
    super(new User(), datasource)
  }

  get() {
    // logic
  }

  list() {

  }

  async register() {
    await DataSource.post(`${User.entity}`)
  }

  async login (username, password) {
    await DataSource.post(`${User.entity}`, {
      username: username,
      password: password
    })
  }

  async getInfo() {
  }
}
