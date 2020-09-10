import { Model } from '@vuex-orm/core'

export default class Locker  extends Model {
  static entity = 'lockers'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      createdAt: this.attr('')
    }

  }
}