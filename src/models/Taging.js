import { Model } from '@vuex-orm/core'
import Repository from './Repository'
import Note from './Note'

export default class Taging extends Model {

  static entity = 'taging'

  static primaryKey = ['repositoryId', 'tagIds']

  static fields () {
    return {
      id: this.attr(null),
      repositoryId: this.attr(''),
      tagIds: this.attr('')
    }

  }
}
