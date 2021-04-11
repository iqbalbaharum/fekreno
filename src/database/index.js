import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Project from '../models/Project'
import Journal from '../models/Journal'
import Country from '../models/Country'
import Comment from '../models/Comment'
import Material from '../models/Material'
import Repository from '../models/Repository'
import DevEnvironment from '../models/DevEnvironment'
import Position from '../models/Position'
import Application from '../models/Application'
import ApplicationProject from '../models/ApplicationProject'
import Note from '../models/Note'
import RepositoryNote from '../models/RepositoryNote'
import Tag from '../models/Tag'
import Taging from '../models/Taging'
import Topic from '../models/Topic'
import TopicNotes from '../models/TopicNotes'
import Notification from '../models/Notification'

// Relation
import UserRole from '../models/UserRole'
import UserProfile from '../models/UserProfile'
import UserApplication from '../models/UserApplication'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
database.register(Project)
database.register(Journal)
database.register(Country)
database.register(Comment)
database.register(Material)
database.register(Repository)
database.register(Note)
database.register(DevEnvironment)
database.register(Position)
database.register(Application)
database.register(ApplicationProject)
database.register(Tag)
database.register(Taging)
database.register(Topic)
database.register(TopicNotes)
database.register(Notification)
//
database.register(UserRole)
database.register(UserProfile)
database.register(UserApplication)
database.register(RepositoryNote)

export default database
