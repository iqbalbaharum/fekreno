

import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'

export default {
  //userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository()
}
