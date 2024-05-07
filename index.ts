import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

//ROUTERS IMPORTS
import { userRouter } from "./src/user/user.router";
import { locationTypeRouter } from "./src/locationType/locationType.router";
import { photoRouter } from "./src/photo/photo.router";
import { tripRouter } from "./src/trip/trip.router";
import { locationRouter } from "./src/location/location.router";
import { tripLocationRouter } from "./src/tripLocation/tripLocation.router";
import { userTripRouter } from "./src/userTrip/userTrip.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript in Vercel");
});

//ENTITIES ROUTERS
app.use("/api/user", userRouter);
app.use("/api/locationType", locationTypeRouter);
app.use("/api/photo", photoRouter);
app.use("/api/trip", tripRouter);
app.use("/api/location", locationRouter);
app.use("/api/tripLocation", tripLocationRouter);
app.use("/api/userTrip", userTripRouter);

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`);
  0;
});
