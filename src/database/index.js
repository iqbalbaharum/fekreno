import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Track from '../models/Track'
import Project from '../models/Project'
import Journal from '../models/Journal'
import Country from '../models/Country'
import Comment from '../models/Comment'

// Relation
import UserRole from '../models/UserRole'
import UserTrack from '../models/UserTrack'
import UserProfile from '../models/UserProfile'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
database.register(Track)
database.register(Project)
database.register(Journal)
database.register(Country)
database.register(Comment)
//
database.register(UserRole)
database.register(UserTrack)
database.register(UserProfile)

export default database
