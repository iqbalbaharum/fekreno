export default class Repository {

  constructor(model, datasource) {
    this.model = model
    this.datasource = datasource
  }

  async create(data) {
    return await this.datasource.post(`${this.model.entity}`, data)
  }

  async listing() {
    return await this.datasource.get(`${this.model.entity}`)
  }

  async delete(id) {
    return await this.datasource.delete(`${this.model.entity}/${id}`)
  }

  async delete(id) {
    return await this.datasource.delete(`${this.model.entity}/${id}`)
  }
}
