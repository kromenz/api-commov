import { db } from "../utils/db.server";

type LocationType = {
  name: string;
};

// get all location types
export const listLocationTypes = async (): Promise<LocationType[]> => {
  return db.locationType.findMany({
    select: {
      uuid: true,
      name: true,
    },
  });
};

//create location type
export const createLocationType = async (
  locationTypeData: LocationType
): Promise<LocationType | null> => {
  try {
    const newLocationType = await db.locationType.create({
      data: {
        name: locationTypeData.name,
      },
    });

    return newLocationType;
  } catch (error) {
    console.error("Error creating location type:", error);
    throw error;
  }
};

// Delete location type by name
export const deleteLocationTypeByName = async (name: string): Promise<void> => {
  try {
    await db.locationType.deleteMany({
      where: {
        name: name, // Filter by unique name
      },
    });
  } catch (error) {
    console.error("Error deleting location type:", error);
    throw error; // Re-throw error for proper handling in the router
  }
};
