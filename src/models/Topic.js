import { Model } from '@vuex-orm/core'
import User from './User'
import TopicNotes from './TopicNotes'
import Notes from './Note'

export default class Topic extends Model {

  static entity = 'topics'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),
      userId: this.attr(''),

      user: this.belongsTo(User, 'userId'),
      notes: this.belongsToMany(Notes, TopicNotes, 'topicId', 'noteId'),
    }

  }

  get timeAgo() {
    let seconds = Math.floor((new Date() - new Date(this.updatedAt)) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
}
