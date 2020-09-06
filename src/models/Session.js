import { Model } from '@vuex-orm/core'
import User from './User'

export default class Session extends Model {

  static entity = 'session'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
      user: this.belongsTo(User, 'userUuid')
    }

  }
}
