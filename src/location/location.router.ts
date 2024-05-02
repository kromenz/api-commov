import express from "express";
import { Request, Response } from "express";
import * as LocationService from "./location.service";

export const locationRouter = express.Router();

locationRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const locationData = req.body;
    const newLocation = await LocationService.createLocation(locationData);
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(500).json({ error: "Error creating location" });
  }
});

locationRouter.get("/:uuid", async (req: Request, res: Response) => {
  const locationId = req.params.uuid;
  try {
    const location = await LocationService.getLocationById(locationId);
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json("Location not found");
    }
  } catch (error) {
    console.error("Error getting location:", error);
    res.status(500).json({ error: "Error getting location" });
  }
});

locationRouter.get("/", async (req: Request, res: Response) => {
  try {
    const locations = await LocationService.getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error getting locations:", error);
    res.status(500).json({ error: "Error getting locations" });
  }
});

locationRouter.put("/update/:uuid", async (req: Request, res: Response) => {
  const locationId = req.params.uuid;
  const updatedLocationData = req.body;
  try {
    const updatedLocation = await LocationService.updateLocation(
      locationId,
      updatedLocationData
    );
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ error: "Error updating location" });
  }
});

locationRouter.delete("/delete/:uuid", async (req: Request, res: Response) => {
  const locationId = req.params.uuid;
  try {
    await LocationService.deleteLocation(locationId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ error: "Error deleting location" });
  }
});
