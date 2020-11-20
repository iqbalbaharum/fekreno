

import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'
import ProjectRepository from './ProjectRepository'
import JournalRepository from './JournalRepository'
import CountryRepository from './CountryRepository'
import MaterialRepository from './MaterialRepository'
import DevEnvironmentRepository from './DevEnvironmentRepository'
import RepositoryRepository from './RepositoryRepository'
import PositionRepository from './PositionRepository'

export default {
  //userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository(),
  project: new ProjectRepository(),
  journal: new JournalRepository(),
  country: new CountryRepository(),
  material: new MaterialRepository(),
  devenvironment: new DevEnvironmentRepository(),
  repository: new RepositoryRepository(),
  position: new PositionRepository()
}
