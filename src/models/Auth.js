import { Model } from '@vuex-orm/core'

export default class Auth extends Model {


  static entity = 'user'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr('')
    }

  }
}
