import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import TagService from "./tag.service";
import config from "../../config/environment";

const tagService = new TagService(config.db);

class TagController {
  private tagService: TagService;

  constructor(tagService: TagService) {
    this.tagService = tagService;
  }

  public GetAllTags = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.tagService.ListAllTags();
    res.status(200).json(result);
  });
}

export default new TagController(tagService);
