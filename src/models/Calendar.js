import { Model } from '@vuex-orm/core'
import User from './User'

export default class Calendar extends Model {

  static entity = 'calendars'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
      type: this.attr(''),
      status: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      start: this.attr(''),
      end: this.attr(''),
      userId: this.attr(''),
      approvalBy: this.attr(''),
      requestApprovalUserId: this.attr(''),

      user: this.belongsTo(User, 'userId'),
    }

  }
}
