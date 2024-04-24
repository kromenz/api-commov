import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

//ROUTERS IMPORTS
import { userRouter } from "./user/user.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

//ENTITIES ROUTERS
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
