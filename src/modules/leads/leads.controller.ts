import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import LeadService from "./leads.service";
import config from "../../config/environment";
import { Result } from "pg";

const leadService = new LeadService(config.db);

class LeadController {
  private leadService: LeadService;

  constructor(leadService: LeadService) {
    this.leadService = leadService;
  }

  public FilterLeadsByTags = asyncHandler(
    async (req: Request, res: Response) => {
      const tag_id = Number(req.params.id);
      const result = await this.leadService.FilterLeadsByTags(tag_id);
      res.status(200).json(result);
    }
  );

  public GetAllUserLeads = asyncHandler(async (req: Request, res: Response) => {
    const user_id = Number(req.params.id);
    const result = await this.leadService.GetAllUserLeads(user_id);
    res.status(200).json(result);
  });

  public UpdateLeadTag = asyncHandler(async (req: Request, res: Response) => {
    const { tag_id } = req.body;
    const lead_id = Number(req.params.id);

    if (!tag_id || isNaN(tag_id)) {
      res.status(400).json({ message: "ID de etiqueta inválido" });
      return;
    }

    const result = await this.leadService.UpdateLeadTag(
      { id_tag_id: tag_id },
      lead_id
    );

    res.status(200).json(result);
  });

  public CreateLead = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.id_tag_id || isNaN(req.body.id_tag_id)) {
      res.status(400).json({ message: "Etiqueta inválida o no proporcionada" });
      return;
    }
    const result = await this.leadService.CreateLead(req.body);
    res.status(201).json(result);
  });
}

export default new LeadController(leadService);
