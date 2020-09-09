import User from './../models/Locker'

export default class LockerRepository extends Repository {

  constructor () {
    super(User, datasource)
  }
}
