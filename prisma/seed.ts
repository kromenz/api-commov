import { db } from "../src/utils/db.server";
import { hashPassword } from "../src/utils/password";

type LocationType = {
  name: string;
};

type User = {
  firstName: string;
  lastName: string;
  avatar: Buffer | undefined;
  username: string;
  password: string;
  email: string;
  type: boolean;
};

async function seed() {
  const users = getUsers();

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password),
    }))
  );
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          username: user.username,
          password: user.password,
          email: user.email,
          type: user.type,
        },
      });
    })
  );

  await Promise.all(
    getLocationTypes().map((LocationType) => {
      return db.locationType.create({
        data: {
          name: LocationType.name,
        },
      });
    })
  );
}

seed();

function getUsers(): Array<User> {
  return [
    {
      firstName: "Rafael",
      lastName: "André",
      username: "kromenz",
      password: "123",
      email: "rafael.pires.andre@ipvc.pt",
      type: true,
      avatar: undefined,
    },
    {
      firstName: "Diogo",
      lastName: "Pinheiro",
      avatar: undefined,
      username: "pinhas",
      password: "123",
      email: "pinheirodiogo@ipvc.pt",
      type: true,
    },
    {
      firstName: "Pedro",
      lastName: "Simões",
      avatar: undefined,
      username: "nx",
      password: "123",
      email: "pedrosimoes@ipvc.pt",
      type: true,
    },
  ];
}

function getLocationTypes(): Array<LocationType> {
  return [
    {
      name: "Restaurant",
    },
    {
      name: "Museum",
    },
    {
      name: "Park",
    },
    {
      name: "Beach",
    },
    {
      name: "Mountain",
    },
    {
      name: "Lake",
    },
    {
      name: "City",
    },
    {
      name: "Landmark",
    },
    {
      name: "Countryside",
    },
    {
      name: "Island",
    },
    {
      name: "Historic Site",
    },
    {
      name: "Forest",
    },
    {
      name: "Desert",
    },
    {
      name: "Village",
    },
    {
      name: "Farm",
    },
    {
      name: "Camping Site",
    },
    {
      name: "Amusement Park",
    },
    {
      name: "Zoo",
    },
    {
      name: "Shopping Mall",
    },
    {
      name: "Market",
    },
    {
      name: "Waterfall",
    },
    {
      name: "Cave",
    },
    {
      name: "Harbor",
    },
    {
      name: "Castle",
    },
    {
      name: "Church",
    },
    {
      name: "Mosque",
    },
    {
      name: "Temple",
    },
    {
      name: "Synagogue",
    },
    {
      name: "Library",
    },
    {
      name: "University",
    },
    {
      name: "Hospital",
    },
    {
      name: "Stadium",
    },
    {
      name: "Theater",
    },
    {
      name: "Concert Hall",
    },
    {
      name: "Cinema",
    },
    {
      name: "Beach Resort",
    },
    {
      name: "Ski Resort",
    },
    {
      name: "Spa",
    },
    {
      name: "Golf Course",
    },
    {
      name: "Race Track",
    },
    {
      name: "Other",
    },
  ];
}
