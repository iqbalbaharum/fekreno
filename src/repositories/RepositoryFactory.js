

import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import LockerRepository from './LockerRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'

export default {
  //userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  locker: new LockerRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository()
}
