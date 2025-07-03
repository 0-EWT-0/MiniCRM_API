"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.FilterLeadsByTags = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const tag_id = Number(req.params.id);
            const result = yield this.leadService.FilterLeadsByTags(tag_id);
            res.status(200).json(result);
        }));
        this.GetAllUserLeads = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = Number(req.params.id);
            const result = yield this.leadService.GetAllUserLeads(user_id);
            res.status(200).json(result);
        }));
        this.UpdateLeadTag = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tag_id } = req.body;
            const lead_id = Number(req.params.id);
            if (!tag_id || isNaN(tag_id)) {
                res.status(400).json({ message: "ID de etiqueta inválido" });
                return;
            }
            const result = yield this.leadService.UpdateLeadTag({ id_tag_id: tag_id }, lead_id);
            res.status(200).json(result);
        }));
        this.CreateLead = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.id_tag_id || isNaN(req.body.id_tag_id)) {
                res.status(400).json({ message: "Etiqueta inválida o no proporcionada" });
                return;
            }
            const result = yield this.leadService.CreateLead(req.body);
            res.status(201).json(result);
        }));
        this.leadService = leadService;
    }
}
exports.default = new LeadController(leadService);
