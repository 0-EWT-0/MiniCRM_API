"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const emailjs = __importStar(require("@emailjs/nodejs"));
// nuevo, contactado, descartado
// cada vez que se INSERT un lead, notificar por correo al usuario
class LeadService {
    constructor(db) {
        this.db = db;
    }
    async GetAllUserLeads(user_id) {
        const query = `
          SELECT lc.* FROM leads_crm as lc INNER JOIN tags_crm as tc ON lc.id_tag_id = tc.tag_id WHERE lc.id_user_id = $1 
          `;
        const values = [user_id];
        const response = await this.db.query(query, values);
        return response;
    }
    async UpdateLeadTag(lead_tag_id, lead_id) {
        const query = `UPDATE leads_crm SET id_tag_id = $1 WHERE lead_id = $2`;
        const values = [lead_tag_id.id_tag_id, lead_id];
        const response = await this.db.query(query, values);
        return response;
    }
    async FilterLeadsByTags(tag_id) {
        const query = `SELECT * FROM leads_crm WHERE id_tag_id = $1`;
        const values = [tag_id];
        const response = await this.db.query(query, values);
        return response;
    }
    async CreateLead(lead) {
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
        // Obtener el correo del usuario destino
        const userRes = await this.db.query(`SELECT email, name FROM users_crm WHERE user_id = $1`, [lead.id_user_id]);
        const user = userRes.rows[0];
        if (!user) {
            throw new Error("Usuario no encontrado para enviar el correo.");
        }
        try {
            await emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
                user_email: user.email,
                to_name: user.name,
                lead_name: newLead.name,
                lead_tittle: newLead.tittle,
                lead_email: newLead.email,
                lead_number: newLead.number,
            }, {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            });
        }
        catch (error) {
            console.error("❌ Error al enviar correo de nuevo lead:", error);
        }
        return { message: "Lead creado y correo enviado al usuario." };
    }
}
exports.default = LeadService;
