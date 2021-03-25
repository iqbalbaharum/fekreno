import Repository from "./Repository";
import Journal from "./../models/Journal";
import datasource from "../datasources/baljs-rest-api";
import qs from "qs";

export default class JournalRepository extends Repository {
  constructor() {
    super(Journal, datasource);
  }

  async createComment(id, data) {
    return await this.datasource.post(`${Journal.entity}/${id}/comments`, data);
  }

  async listAllJournal(filter) {
    return datasource({
      method: "get",
      url: "journal/all",
      params: {
        filter: filter
      }
    });
  }

  async updateDiscuss(id) {
    const response = await datasource({
      method: "post",
      url: `journal/${id}/discuss`
    });

    return response;
  }

  async updateReviewed(id) {
    const response = await datasource({
      method: "post",
      url: `journal/${id}/reviewed`
    });

    return response;
  }
}
