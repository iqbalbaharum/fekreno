import { Model } from '@vuex-orm/core'

export default class Zone  extends Model {
  static entity = 'zone'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      createdAt: this.attr('')
    }

  }
}