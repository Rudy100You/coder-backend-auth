import { userSchema } from "../schema/user.schema.js";
import { CommonMDBRepository } from "./commonMDB.repository.js";

export class UserRepository extends CommonMDBRepository {
  constructor() {
    super("users", userSchema);
  }
}