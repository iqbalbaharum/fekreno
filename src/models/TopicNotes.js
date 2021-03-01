import { Model } from '@vuex-orm/core'
import User from './User'

export default class TopicNotes extends Model {

  static entity = 'topics-notes'

  static primaryKey = ['topicId', 'noteId']

  static fields () {
    return {
      id: this.attr(''),
      topicId: this.attr(''),
      noteId: this.attr('')
    }

  }
}