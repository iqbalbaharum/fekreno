import { Model } from '@vuex-orm/core'
import Project from './Project'
import User from './User'

export default class Journal extends Model {

  static entity = 'journal'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(null),
      detail: this.attr(null),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      deletedAt: this.attr(''),
      userId: this.attr(''),
      projectId: this.attr(''),
      category: this.attr(''),

      // relation
      user: this.belongsTo(User, 'userId'),
      project: this.belongsTo(Project, 'id')
    }

  }

  static mutators () {
    return {
      category (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
}
