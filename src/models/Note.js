import { Model } from '@vuex-orm/core'
import User from './User'

export default class Note extends Model {

  static entity = 'note'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(null),
      text: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      toUserId: this.attr(''),
      fromUserId: this.attr(''),
      // relation
      toUser: this.belongsTo(User, 'toUserId'),
      fromUser: this.belongsTo(User, 'fromUserId')
    }

  }
}
