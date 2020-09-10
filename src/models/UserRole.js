import { Model } from '@vuex-orm/core'
import Role from './Role'
import User from './User'

export default class UserRole extends Model {

  static entity = 'userrole'

  static primaryKey = ['userId', 'roleId']

  static fields () {
    return {
      userId: this.attr(''),
      roleId: this.attr('')
    }

  }
}
