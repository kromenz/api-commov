import express from "express";
import type { Request, Response } from "express";
import * as TripLocationService from "./tripLocation.service";

export const tripLocationRouter = express.Router();

tripLocationRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const { tripId, locationId } = req.body;
    const newTripLocation = await TripLocationService.createTripLocation(
      tripId,
      locationId
    );
    res.status(201).json(newTripLocation);
  } catch (error) {
    console.error("Error creating trip location:", error);
    res.status(500).json({ error: "Error creating trip location" });
  }
});

tripLocationRouter.get("/", async (req: Request, res: Response) => {
  try {
    const tripLocations = await TripLocationService.getAllTripLocations();
    res.status(200).json(tripLocations);
  } catch (error) {
    console.error("Error getting all trip locations:", error);
    res.status(500).json({ error: "Error getting all trip locations" });
  }
});

tripLocationRouter.get(
  "/:tripId/:locationId",
  async (req: Request, res: Response) => {
    try {
      const { tripId, locationId } = req.params;
      const tripLocation = await TripLocationService.getTripLocationByIds(
        tripId,
        locationId
      );
      if (tripLocation) {
        res.status(200).json(tripLocation);
      } else {
        res.status(404).json({ error: "Trip location not found" });
      }
    } catch (error) {
      console.error("Error getting trip location:", error);
      res.status(500).json({ error: "Error getting trip location" });
    }
  }
);

tripLocationRouter.delete(
  "/:tripId/:locationId",
  async (req: Request, res: Response) => {
    try {
      const { tripId, locationId } = req.params;
      await TripLocationService.deleteTripLocationByIds(tripId, locationId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting trip location:", error);
      res.status(500).json({ error: "Error deleting trip location" });
    }
  }
);
