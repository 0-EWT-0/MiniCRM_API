"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const leads_service_1 = __importDefault(require("./leads.service"));
const environment_1 = __importDefault(require("../../config/environment"));
const leadService = new leads_service_1.default(environment_1.default.db);
class LeadController {
    constructor(leadService) {
        this.FilterLeadsByTags = (0, asyncHandler_1.default)(async (req, res) => {
            const tag_id = Number(req.params.id);
            const result = await this.leadService.FilterLeadsByTags(tag_id);
            res.status(200).json(result);
        });
        this.GetAllUserLeads = (0, asyncHandler_1.default)(async (req, res) => {
            const user_id = Number(req.params.id);
            const result = await this.leadService.GetAllUserLeads(user_id);
            res.status(200).json(result);
        });
        this.UpdateLeadTag = (0, asyncHandler_1.default)(async (req, res) => {
            const { tag_id } = req.body;
            const lead_id = Number(req.params.id);
            if (!tag_id || isNaN(tag_id)) {
                res.status(400).json({ message: "ID de etiqueta inválido" });
                return;
            }
            const result = await this.leadService.UpdateLeadTag({ id_tag_id: tag_id }, lead_id);
            res.status(200).json(result);
        });
        this.CreateLead = (0, asyncHandler_1.default)(async (req, res) => {
            if (!req.body.id_tag_id || isNaN(req.body.id_tag_id)) {
                res.status(400).json({ message: "Etiqueta inválida o no proporcionada" });
                return;
            }
            const result = await this.leadService.CreateLead(req.body);
            res.status(201).json(result);
        });
        this.leadService = leadService;
    }
}
exports.default = new LeadController(leadService);
