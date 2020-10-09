import { Model } from '@vuex-orm/core'
import User from './User'

export default class Comment extends Model {

  static entity = 'comment'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(null),
      comment: this.attr(null),
      journalId: this.attr(''),
      userId: this.attr(''),
      category: this.attr(''),
      // relation
      from: this.belongsTo(User, 'userId'),
    }

  }
}
