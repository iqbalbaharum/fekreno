import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Locker from '../models/Locker'
import Zone from '../models/Zone'
import Role from '../models/Role'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Locker)
database.register(Zone)
database.register(Role)

export default database
