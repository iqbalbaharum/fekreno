import { Model } from '@vuex-orm/core'
import User from './User'

export default class ApplicationProject extends Model {

  static entity = 'application_project'

  static primaryKey = ['projectId', 'applicationId']

  static fields () {
    return {
      id: this.attr(null),
      projectId: this.attr(null),
      applicationId: this.attr(''),
    }
  }
}
