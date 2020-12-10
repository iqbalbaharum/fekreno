import { Model } from '@vuex-orm/core'
import User from './User'
import Project from './Project'
import ApplicationProject from './ApplicationProject'

export default class Application extends Model {

  static entity = 'application'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.attr(null),
      title: this.attr(null),
      description: this.attr(''),
      type: this.attr(''),
      about: this.attr(''),
      minProject: this.attr(''),
      maxApplied: this.attr(''),
      logo: this.attr(''),
      icon: this.attr(''),
      questions: this.attr(''),
      featured: this.attr(false),
      method: this.attr(''),
      location: this.attr(''),
      updatedAt: this.attr(''),
      createdby: this.attr(''),
      // relation
      createdby: this.belongsTo(User, 'createdby'),
      projects: this.belongsToMany(Project, ApplicationProject, 'applicationId', 'projectId'),
    }
  }

  get getQuestionsJsonObject() {
    return JSON.parse(this.questions)
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
