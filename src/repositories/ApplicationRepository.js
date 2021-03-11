import Repository from './Repository'
import Application from './../models/Application'
import datasource from '../datasources/baljs-rest-api'

export default class ApplicationRepository extends Repository {
  constructor () {
    super(Application, datasource)
  }

  async getApplicationProjects(id) {
    return datasource({
      method: 'get',
      url: `/applications/${id}/projects`
    })
  }

  async linkApplicationProject(id, projectId) {
    return datasource({
      method: 'post',
      url: `/applications/${id}/link/projects`,
      data: {
        projectId: projectId
      }
    })
  }

  async unlinkApplicationProject(id, projectId) {
    return datasource({
      method: 'post',
      url: `/applications/${id}/unlink/projects`,
      data: {
        projectId: projectId
      }
    })
  }

  async activateApplication(id) {
    return datasource({
      method: 'post',
      url: `/application/${id}/activate`
    })
  }

  async deactivateApplication(id) {
    return datasource({
      method: 'post',
      url: `/application/${id}/deactivated`
    })
  }

  async closeApplication(id, acceptedIds) {
    return datasource({
      method: 'post',
      url: '/application/close',
      data: {
        applicationId: id,
        acceptedUserApplicationIds: acceptedIds
      }
    })
  }
}
