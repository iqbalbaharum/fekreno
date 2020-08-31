

import UserRepository from './UserRepository'

export default {
  //userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository()
}
