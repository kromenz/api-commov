import { db } from "../utils/db.server";

export type Photo = {
  uuid: string;
  data: string;
  locationId: string;
};

// Create a new photo
export const createPhoto = async (photoData: {
  data: string;
  locationId: string;
}): Promise<Photo> => {
  try {
    const { data, locationId } = photoData;

    // Verificar se a localização existe antes de criar a foto
    const existingLocation = await db.location.findUnique({
      where: { uuid: locationId },
    });
    if (!existingLocation) {
      throw new Error("Location not found");
    }

    // Criar a nova foto associada à localização
    const newPhoto = await db.photo.create({
      data: {
        data,
        location: { connect: { uuid: locationId } },
      },
      include: { location: true },
    });

    return {
      uuid: newPhoto.uuid,
      data: newPhoto.data,
      locationId: newPhoto.locationId,
    };
  } catch (error) {
    console.error("Error creating photo:", error);
    throw error;
  }
};

// Update an existing photo
export const updatePhoto = async (
  photoId: string,
  updatedPhotoData: { data?: string }
): Promise<void> => {
  try {
    const { data } = updatedPhotoData;

    if (data) {
      await db.photo.update({
        where: { uuid: photoId },
        data: {
          data,
        },
      });
    } else {
      throw new Error("No data provided to update");
    }
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error;
  }
};

// Get a specific photo by ID
export const getPhotoById = async (photoId: string): Promise<Photo | null> => {
  try {
    const photo = await db.photo.findUnique({
      where: { uuid: photoId },
      include: { location: true },
    });

    if (photo) {
      return {
        uuid: photo.uuid,
        data: photo.data,
        locationId: photo.locationId,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting photo by ID:", error);
    throw error;
  }
};

// Get all photos
export const getAllPhotos = async (): Promise<Photo[]> => {
  try {
    const photos = await db.photo.findMany();
    return photos;
  } catch (error) {
    console.error("Error getting all photos:", error);
    throw error;
  }
};

// Delete a photo by ID
export const deletePhotoById = async (photoId: string): Promise<void> => {
  try {
    await db.photo.delete({
      where: { uuid: photoId },
    });
  } catch (error) {
    console.error("Error deleting photo by ID:", error);
    throw error;
  }
};
