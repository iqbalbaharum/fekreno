

import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'
import TrackRepository from './TrackRepository'
import ProjectRepository from './ProjectRepository'
import JournalRepository from './JournalRepository'
import CountryRepository from './CountryRepository'

export default {
  //userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository(),
  track: new TrackRepository(),
  project: new ProjectRepository(),
  journal: new JournalRepository(),
  country: new CountryRepository()
}
