import { Model } from '@vuex-orm/core'

export default class DevEnvironment extends Model {

  static entity = 'position'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
      title: this.attr(null),
      description: this.attr('')
    }

  }
}
