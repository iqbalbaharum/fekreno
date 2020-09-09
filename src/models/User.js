import { Model } from '@vuex-orm/core'

export default class User  extends Model {


  static entity = 'user'

  static primaryKey = 'uuid'

  static fields () {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      email: this.attr(''),
      mobile: this.attr(''),
      createdAt: this.attr('')
    }

  }
}
