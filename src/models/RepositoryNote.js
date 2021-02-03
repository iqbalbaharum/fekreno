import { Model } from '@vuex-orm/core'
import Repository from './Repository'
import Note from './Note'

export default class RepositoryNote extends Model {

  static entity = 'repository-note'

  static primaryKey = ['repositoryId', 'noteId']

  static fields () {
    return {
      id: this.attr(null),
      repositoryId: this.attr(''),
      noteId: this.attr('')
    }

  }
}
