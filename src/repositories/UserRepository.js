import datasource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import User from './../models/User'
import qs from 'qs'

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
    const response = await datasource({
      method: 'post',
      url: `${User.entity}/login`,
      data: qs.stringify({
        username: username,
        password: password
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })

    console.log(response)
  }

  async getInfo() {
  }
}
