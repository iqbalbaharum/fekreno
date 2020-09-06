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
    const response = await this.datasource.get(`${this.model.entity}`)
    this.model.insert({ data: response.data })
  }

}
