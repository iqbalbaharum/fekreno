import Repository from './Repository'
import Track from './../models/Track'
import datasource from '../datasources/baljs-rest-api'

export default class TrackRepository extends Repository {
  constructor () {
    super(Track, datasource)
  }

  async join(userId, trackId) {
    return datasource({
      method: 'post',
      url: `users/${userId}/tracks/join`,
      data: {
        trackId: trackId
      }
    })
  }

  async quit(userId, trackId) {
    return datasource({
      method: 'post',
      url: `users/${userId}/tracks/quit`,
      data: {
        trackId: trackId
      }
    })
  }
}
