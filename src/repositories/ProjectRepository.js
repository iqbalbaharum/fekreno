import Repository from './Repository'
import Project from './../models/Project'
import datasource from '../datasources/baljs-rest-api'

export default class ProjectRepository extends Repository {
  constructor () {
    super(Project, datasource)
  }
}
