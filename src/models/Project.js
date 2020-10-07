import { Model } from '@vuex-orm/core'

export default class Project extends Model {

  static entity = 'project'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
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
