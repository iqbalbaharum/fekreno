export default class Repository {

  constructor(model, datasource) {
    this.model = model
    this.datasource = datasource
  }

  async create() {
    const response = await this.datasource.get(`${this.model.entity}`)
    this.model.insert({ data: response })
  }

  async listing() {
    return await this.datasource.get(`${this.model.entity}`)
  }

  async delete(id) {
    return await this.datasource.delete(`${this.model.entity}/${id}`)
  }

}
