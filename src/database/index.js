import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
// Relation
import UserRole from '../models/UserRole'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
//
database.register(UserRole)

export default database
