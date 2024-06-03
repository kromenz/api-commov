import express from "express";
import { Request, Response } from "express";
import * as UserTripService from "./userTrip.service";

export const userTripRouter = express.Router();

userTripRouter.get("/:user/trips", async (req: Request, res: Response) => {
  const userId: string = req.params.user;

  try {
    const userExists = await UserTripService.userExists(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const trips = await UserTripService.tripsByUser(userId);
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error mapping trips for user:", error);
    res.status(500).json({ error: "Error mapping trips for user" });
  }
});

userTripRouter.get("/:tripId", async (req: Request, res: Response) => {
  const tripId: string = req.params.tripId;

  try {
    const users = await UserTripService.getUsersByTrip(tripId);
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found for this trip" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users for trip:", error);
    res.status(500).json({ error: "Error fetching users for trip" });
  }
});

userTripRouter.get("/", async (req: Request, res: Response) => {
  try {
    const trips = await UserTripService.getAllUserTrips();
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error getting trips:", error);
    res.status(500).json({ error: "Error getting trips" });
  }
});

userTripRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const { userId, tripId } = req.body;
    const newUserTrip = await UserTripService.createUserTrip(userId, tripId);
    res.status(201).json(newUserTrip);
  } catch (error) {
    console.error("Error creating userTrip:", error);
    res.status(500).json({ error: "Error creating userTrip" });
  }
});

userTripRouter.delete(
  "/delete/:userId/:tripId",
  async (req: Request, res: Response) => {
    const { userId, tripId } = req.params;
    try {
      await UserTripService.deleteUserTrip(userId, tripId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting userTrip:", error);
      res.status(500).json({ error: "Error deleting userTrip" });
    }
  }
);

userTripRouter.delete(
  "/deleteTripId/:tripId",
  async (req: Request, res: Response) => {
    const { tripId } = req.params;
    try {
      await UserTripService.deleteUserTripsByTrip(tripId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting userTrips by trip:", error);
      res.status(500).json({ error: "Error deleting userTrips by trip" });
    }
  }
);
