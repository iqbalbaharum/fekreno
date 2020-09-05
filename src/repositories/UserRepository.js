import datasource from './../datasources/baljs-rest-api'
import Repository from './Repository'
import User from './../models/User'
import qs from 'qs'

export default class UserRepository extends Repository {

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

  async login (email, password) {
    const response = await datasource({
      method: 'post',
      url: `${User.entity}/login`,
      data: qs.stringify({
        email: email,
        password: password
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })

    return response
  }

  async getInfo() {
    const response = await datasource({
      method: 'get',
      url: `me`,
    })

    return response
  }

  async logout() {
    await datasource({
      method: 'post',
      url: `${User.entity}/user/logout`,
    })
  }
}
