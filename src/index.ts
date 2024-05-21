import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

//ROUTERS IMPORTS
import { userRouter } from "./user/user.router";
import { locationTypeRouter } from "./locationType/locationType.router";
import { photoRouter } from "./photo/photo.router";
import { tripRouter } from "./trip/trip.router";
import { locationRouter } from "./location/location.router";
import { tripLocationRouter } from "./tripLocation/tripLocation.router";
import { userTripRouter } from "./userTrip/userTrip.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para logging de requisições
app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
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

app
  .listen(PORT, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${PORT}`);
    0;
  })
  .on("error", (err) => {
    console.error("Server failed to start due to error:", err);
  });
