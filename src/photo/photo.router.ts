import express from "express";
import type { Request, Response } from "express";
import * as PhotoService from "./photo.service";

export const photoRouter = express.Router();

// Create a new photo
photoRouter.post("/create", async (req, res) => {
  try {
    const photo = await PhotoService.createPhoto(req.body);
    res.status(201).json(photo);
  } catch (error) {
    console.error("Error creating photo:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update an existing photo
photoRouter.put("/update/:uuid", async (req, res) => {
  try {
    const photoId = req.params.uuid;
    const updatedPhoto = req.body;
    await PhotoService.updatePhoto(photoId, updatedPhoto);
    res.status(200).json({ message: "Photo updated successfully" });
  } catch (error) {
    console.error("Error updating photo:", error);
    res.status(500).json({ error: error.message });
  }
});

//Get all photos
photoRouter.get("/", async (req: Request, res: Response) => {
  try {
    const photos = await PhotoService.getAllPhotos();
    res.status(200).json(photos);
  } catch (error) {
    console.error("Error getting photos:", error);
    res.status(500).json({ error: "Error getting photos" });
  }
});

// Get a specific photo
photoRouter.get("/:uuid", async (req, res) => {
  const photoId = req.params.uuid;
  try {
    const photo = await PhotoService.getPhotoById(photoId);
    if (photo) {
      return res.status(200).json(photo);
    }
    return res.status(404).json("Photo could not be found");
  } catch (error) {
    console.error("Error getting photo:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a photo
photoRouter.delete("/delete/:uuid", async (req, res) => {
  try {
    const photoId = req.params.uuid;
    await PhotoService.deletePhotoById(photoId);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ error: error.message });
  }
});
