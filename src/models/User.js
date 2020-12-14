import { Model } from '@vuex-orm/core'
import Role from './Role'
import Repository from './Repository'
import Application from './Application'
import UserRole from './UserRole'
import UserApplication from './UserApplication'
import Profile from './UserProfile'

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
      applications: this.belongsToMany(Application, UserApplication, 'userId', 'applicationId'),
      repositories: this.hasMany(Repository, 'userId'),
      profile: this.hasOne(Profile, 'userId')
    }

  }
}
