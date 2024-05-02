import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

//ROUTERS IMPORTS
import { userRouter } from "./user/user.router";
import { locationTypeRouter } from "./locationType/locationType.router";
import { photoRouter } from "./photo/photo.router";
import { tripRouter } from "./trip/trip.router";
import { locationRouter } from "./location/location.router";

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

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`);
  0;
});
