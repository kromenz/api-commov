import express from "express";
import type { Request, Response } from "express";
import * as LocationTypeService from "./locationType.service";

export const locationTypeRouter = express.Router();

locationTypeRouter.get("/", async (request: Request, response: Response) => {
  try {
    const location_types = await LocationTypeService.listLocationTypes();
    return response.status(200).json(location_types);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

locationTypeRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const locationType = req.body;
    const newlocationType = await LocationTypeService.createLocationType(
      locationType
    );
    res.status(201).json(newlocationType);
  } catch (error) {
    console.error("Erro ao criar location type:", error);
    res.status(500).json({ error: "Erro ao criar location type" });
  }
});

locationTypeRouter.delete(
  "/delete/:name",
  async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      await LocationTypeService.deleteLocationTypeByName(name);
      res.status(200).json({ message: "Location type deleted successfully" });
    } catch (error) {
      console.error("Error deleting location type:", error);
      res.status(500).json({ error: "Error deleting location type" });
    }
  }
);
