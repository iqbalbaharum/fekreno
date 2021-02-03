import { Model } from "@vuex-orm/core";
import User from "./User";

export default class Material extends Model {
  static entity = "materials";

  static primaryKey = "id";

  static fields() {
    return {
      id: this.attr(""),
      title: this.attr(null),
      description: this.attr(""),
      type: this.attr(""),
      url: this.attr(""),
      reviewStatus: this.attr(""),
      remark: this.attr(""),
      userId: this.attr(""),
      createdAt: this.attr(""),
      updatedAt: this.attr(""),
      deletedAt: this.attr(""),
      //
      user: this.belongsTo(User, "userId")
    };
  }
}
