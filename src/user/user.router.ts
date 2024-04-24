import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UserService from "./user.service";

export const userRouter = express.Router();

userRouter.get("/", async (request: Request, response: Response) => {
  try {
    const users = await UserService.listUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: A single user by email
userRouter.get("/:email", async (request: Request, response: Response) => {
  const email: string = request.params.email;
  try {
    const user = await UserService.getUser(email);
    if (user) {
      return response.status(200).json(user);
    }
    return response.status(404).json("User could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create a User
// userRouter.post("/create", async (req: Request, res: Response) => {
//   try {
//     const user = req.body;
//     const newUser = await UserService.createUser(user);
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error("Erro ao criar usuário:", error);
//     res.status(500).json({ error: "Erro ao criar usuário" });
//   }
// });

// // PUT: Updating an User
// userRouter.put(
//   "/:email",
//   body("firstName").isString(),
//   body("lastName").isString(),
//   body("email").isString(),
//   body("username").isString(),
//   body("avatar").isString(),
//   body("type").isBoolean(),
//   body("password").isString(),
//   async (request: Request, response: Response) => {
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//       return response.status(400).json({ errors: errors.array() });
//     }
//     const email: string = request.params.email;
//     try {
//       const user = request.body;
//       const updatedUser = await UserService.updateUser(user, email);
//       return response.status(200).json(updatedUser);
//     } catch (error: any) {
//       return response.status(500).json(error.message);
//     }
//   }
// );
