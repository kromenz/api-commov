import express from "express";
import type { Request, Response } from "express";
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

// GET: Verify User Password
userRouter.get("/:email/:password", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.params;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const isMatch = await UserService.verifyUserPassword(email, password);

    if (isMatch) {
      return res.status(200).json({ message: "Password is correct" });
    } else {
      return res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error verifying user password:", error);
    res.status(500).json({ error: "Error verifying user password" });
  }
});

// PUT: Change User Password
userRouter.put("/:email/:password", async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email;
    const newPassword: string = req.params.password;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email and new password are required" });
    }

    const updatedUser = await UserService.updateUserPassword(
      email,
      newPassword
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Error updating user password:", error);
    return res.status(500).json({ error: "Error updating user password" });
  }
});

// POST: Create a User
userRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await UserService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

userRouter.put("/update/:email", async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const updatedUserData = req.body;

    const updatedUser = await UserService.updateUser(email, updatedUserData);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});
