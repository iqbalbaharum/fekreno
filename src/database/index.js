import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'

const database = new Database()

database.register(User)
database.register(Session)

export default database
