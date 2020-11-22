import { Model } from '@vuex-orm/core'
import Role from './Role'
import Repository from './Repository'
import UserRole from './UserRole'

export default class User extends Model {


  static entity = 'user'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      email: this.attr(''),
      mobile: this.attr(''),
      createdAt: this.attr(''),
      
      roles: this.belongsToMany(Role, UserRole, 'userId', 'roleId'),
      repositories: this.hasMany(Repository, 'userId')
    }

  }
}
