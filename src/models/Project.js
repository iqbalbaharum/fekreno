import { Model } from '@vuex-orm/core'
import Repository from './Repository'
export default class Project extends Model {

  static entity = 'project'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
      title: this.attr(null),
      description: this.attr(''),
      requirements: this.attr(''),
      active: this.attr(false),
      icon: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),

      //relation
      repository: this.hasMany(Repository, 'projectId'),
    }

  }
}
