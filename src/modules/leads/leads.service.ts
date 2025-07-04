import { userInfo } from "os";
import { Pool } from "pg";
import * as emailjs from "@emailjs/nodejs";

interface Lead {
  lead_id: number;
  name: string;
  tittle: string;
  description: string;
  email: string;
  number: string;
  id_tag_id: number;
  id_user_id: number;
}

// nuevo, contactado, descartado

// cada vez que se INSERT un lead, notificar por correo al usuario

class LeadService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async GetAllUserLeads(user_id: number) {
    const query = `
          SELECT lc.* FROM leads_crm as lc INNER JOIN tags_crm as tc ON lc.id_tag_id = tc.tag_id WHERE lc.id_user_id = $1 
          `;

    const values = [user_id];

    const response = await this.db.query(query, values);

    return response;
  }

  public async UpdateLeadTag(
    lead_tag_id: Pick<Lead, "id_tag_id">,
    lead_id: number
  ) {
    const query = `UPDATE leads_crm SET id_tag_id = $1 WHERE lead_id = $2`;

    const values = [lead_tag_id.id_tag_id, lead_id];

    const response = await this.db.query(query, values);

    return response;
  }

  public async FilterLeadsByTags(tag_id: number) {
    const query = `SELECT * FROM leads_crm WHERE id_tag_id = $1`;

    const values = [tag_id];

    const response = await this.db.query(query, values);

    return response;
  }

  public async CreateLead(
    lead: Omit<Lead, "leads_id">
  ): Promise<{ message: string }> {
    const query = `
      INSERT INTO leads_crm (name, tittle, description, email, number, id_tag_id, id_user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      lead.name,
      lead.tittle,
      lead.description,
      lead.email,
      lead.number,
      lead.id_tag_id,
      lead.id_user_id,
    ];

    const result = await this.db.query(query, values);
    const newLead = result.rows[0];

    const userRes = await this.db.query(
      `SELECT email, name FROM users_crm WHERE user_id = $1`,
      [lead.id_user_id]
    );

    const user = userRes.rows[0];

    if (!user) {
      throw new Error("Usuario no encontrado para enviar el correo.");
    }

    try {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        {
          user_email: user.email,
          to_name: user.name,
          lead_name: newLead.name,
          lead_tittle: newLead.tittle,
          lead_email: newLead.email,
          lead_number: newLead.number,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY,
        }
      );
    } catch (error) {
      console.error("❌ Error al enviar correo de nuevo lead:", error);
    }

    return { message: "Lead creado y correo enviado al usuario." };
  }
}

export default LeadService;
