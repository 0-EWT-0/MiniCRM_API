"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const tag_service_1 = __importDefault(require("./tag.service"));
const environment_1 = __importDefault(require("../../config/environment"));
const tagService = new tag_service_1.default(environment_1.default.db);
class TagController {
    constructor(tagService) {
        this.GetAllTags = (0, asyncHandler_1.default)(async (req, res) => {
            const result = await this.tagService.ListAllTags();
            res.status(200).json(result);
        });
        this.tagService = tagService;
    }
}
exports.default = new TagController(tagService);
