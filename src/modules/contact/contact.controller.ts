import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ContactService from "./contact.service";
import config from "../../config/environment";

const contactService = new ContactService(config.db);

class ContactController {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  public RegisterContact = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.contactService.RegisterContact(req.body);
    res.status(201).json(result);
  });
  
}

export default new ContactController(contactService);
