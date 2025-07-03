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
const contact_service_1 = __importDefault(require("./contact.service"));
const environment_1 = __importDefault(require("../../config/environment"));
const contactService = new contact_service_1.default(environment_1.default.db);
class ContactController {
    constructor(contactService) {
        this.RegisterContact = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contactService.RegisterContact(req.body);
            res.status(201).json(result);
        }));
        this.contactService = contactService;
    }
}
exports.default = new ContactController(contactService);
