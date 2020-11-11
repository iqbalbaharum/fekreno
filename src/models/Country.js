import { Model } from '@vuex-orm/core'

export default class Country extends Model {

  static entity = 'country'

  static primaryKey = 'alpha3code'

  static fields () {
    return {
      alpha2Code: this.attr(''),
      alpha3Code: this.attr(''),
      name: this.attr(''),
      flag: this.attr('')
    }

  }
}
