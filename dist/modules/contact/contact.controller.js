"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const contact_service_1 = __importDefault(require("./contact.service"));
const environment_1 = __importDefault(require("../../config/environment"));
const contactService = new contact_service_1.default(environment_1.default.db);
class ContactController {
    constructor(contactService) {
        this.RegisterContact = (0, asyncHandler_1.default)(async (req, res) => {
            const result = await this.contactService.RegisterContact(req.body);
            res.status(201).json(result);
        });
        this.contactService = contactService;
    }
}
exports.default = new ContactController(contactService);
