import { Model } from '@vuex-orm/core'

export default class Tag extends Model {

  static entity = 'tags'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
      title: this.attr(null)
    }

  }
}
