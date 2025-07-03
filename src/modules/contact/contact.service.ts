import { Pool } from "pg";

interface Contact {
  contact_id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

class ContactService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async RegisterContact(contact: Contact): Promise<{ message: string }> {
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

export default ContactService;
