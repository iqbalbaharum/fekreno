import { Model } from '@vuex-orm/core'
import User from './User'

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
      createdby: this.attr(''),
      // relation
      createdby: this.belongsTo(User, 'createdby'),
    }
  }

  get getQuestionsJsonObject() {
    return JSON.parse(this.questions)
  }
}
