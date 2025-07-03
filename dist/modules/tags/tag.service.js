"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TagService {
    constructor(db) {
        this.db = db;
    }
    async ListAllTags() {
        const query = `SELECT * FROM tags_crm`;
        const response = await this.db.query(query);
        return response;
    }
}
exports.default = TagService;
