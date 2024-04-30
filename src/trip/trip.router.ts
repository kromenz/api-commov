import express from "express";
import type { Request, Response } from "express";
import * as TripService from "./trip.service";

export const tripRouter = express.Router();

// Rota para criar uma nova viagem
tripRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const tripData = req.body;
    const newTrip = await TripService.createTrip(tripData);
    res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ error: "Error creating trip" });
  }
});

// Rota para atualizar uma viagem existente
tripRouter.put("/update/:uuid", async (req: Request, res: Response) => {
  const tripId = req.params.uuid;
  const updatedTripData = req.body;
  try {
    const updatedTrip = await TripService.updateTrip(tripId, updatedTripData);
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Error updating trip:", error);
    res.status(500).json({ error: "Error updating trip" });
  }
});

// Rota para obter uma viagem por ID
tripRouter.get("/:uuid", async (req: Request, res: Response) => {
  const tripId = req.params.uuid;
  try {
    const trip = await TripService.getTripById(tripId);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json("Trip not found");
    }
  } catch (error) {
    console.error("Error getting trip:", error);
    res.status(500).json({ error: "Error getting trip" });
  }
});

// Rota para obter todas as viagens
tripRouter.get("/", async (req: Request, res: Response) => {
  try {
    const trips = await TripService.getAllTrips();
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error getting trips:", error);
    res.status(500).json({ error: "Error getting trips" });
  }
});

// Rota para deletar uma viagem por ID
tripRouter.delete("/delete/:uuid", async (req: Request, res: Response) => {
  const tripId = req.params.uuid;
  try {
    await TripService.deleteTripById(tripId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Error deleting trip" });
  }
});
