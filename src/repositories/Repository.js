export default class Repository {

  constructor(model, datasource) {
    this.model = model
    this.datasource = datasource
  }

  async create(data) {
    return await this.datasource.post(`${this.model.entity}`, data)
  }

  async getById(id, filter) {
    return await this.datasource.get(
      `${this.model.entity}/${id}`,
      {
        params: {
          filter: filter
        }
      }
    )
  }

  async listing(filter) {
    return await this.datasource.get(
      `${this.model.entity}`,
      {
        params: {
          filter: filter
        }
      }
    )
  }

  async delete(id) {
    return await this.datasource.delete(`${this.model.entity}/${id}`)
  }

  async delete(id) {
    return await this.datasource.delete(`${this.model.entity}/${id}`)
  }
}
