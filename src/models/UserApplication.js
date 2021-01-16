import { Model } from '@vuex-orm/core'
import Application from './Application'
import User from './User'

export default class UserApplication extends Model {

  static entity = 'user-application'

  static primaryKey = ['userId', 'applicationId']

  static fields () {
    return {
      id: this.attr(''),
      userId: this.attr(''),
      applicationId: this.attr(''),
      state: this.attr(''),
      status: this.attr(''),
      answers: this.attr(''),
      createdAt: this.attr(''),
      updatedAt: this.attr(''),

      user: this.belongsTo(User, 'userId'),
      application: this.belongsTo(Application, 'applicationId')
    }

  }

  get getAnswersJsonObject() {
    return JSON.parse(this.answers)
  }
}
