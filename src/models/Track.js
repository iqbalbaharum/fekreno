import { Model } from '@vuex-orm/core'

export default class Track extends Model {

  static entity = 'track'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(null),
      title: this.attr(null),
      description: this.attr(''),
      active: this.attr(false),
      icon: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
    }

  }
}
