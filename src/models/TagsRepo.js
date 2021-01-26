import {Model} from '@vuex-orm/core';

export default class TagsRepo extends Model{
    static entity = 'taging'

    static primaryKey = 'id'

    static fields () {
        return{
            id: this.attr(null),
            repositoryId: this.attr(''),
            tagsId: this.attr('')
        }
    }
}