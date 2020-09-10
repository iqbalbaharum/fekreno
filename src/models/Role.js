import { Model } from '@vuex-orm/core'

export default class Role  extends Model {
  static entity = 'role'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      createdAt: this.attr('')
    }

  }
}