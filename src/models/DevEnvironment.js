import { Model } from '@vuex-orm/core'

export default class DevEnvironment extends Model {

  static entity = 'environment'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
      name: this.attr(null),
      language: this.attr(''),
      version: this.attr(0),
      active: this.attr(true),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
    }

  }
}
