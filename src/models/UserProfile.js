import { Model } from '@vuex-orm/core'
import User from './User'

export default class Profile extends Model {

  static entity = 'profile'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(''),
      fullname: this.attr(''),
      github: this.attr(''),
      linkedin: this.attr(''),
      country: this.attr(''),
      state: this.attr(''),
      about: this.attr(''),
      birthday: this.attr(''),
      userId: this.attr(''),

      // relation
      user: this.belongsTo(User, 'uuid'),
    }

  }
}
