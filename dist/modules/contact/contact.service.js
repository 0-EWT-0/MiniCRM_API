"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContactService {
    constructor(db) {
        this.db = db;
    }
    async RegisterContact(contact) {
        const query = `
          INSERT INTO contact_crm (name, email, phone, message)
          VALUES ($1, $2, $3, $4)
          `;
        const values = [
            contact.name,
            contact.email,
            contact.phone,
            contact.message,
        ];
        await this.db.query(query, values);
        return { message: "Usuario registrado correctamente" };
    }
}
exports.default = ContactService;
