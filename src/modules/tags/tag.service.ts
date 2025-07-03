import { Pool } from "pg";

class TagService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async ListAllTags() {
    const query = `SELECT * FROM tags_crm`;

    const response = await this.db.query(query);

    return response;
  }
}

export default TagService;
