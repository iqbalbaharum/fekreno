import { Model } from '@vuex-orm/core'

export default class Activity extends Model {

  static entity = 'activities'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(null),
      type: this.attr(''),
      refId: this.attr(''),
      title: this.attr(''),
      message: this.attr('')
    }

  }
}
