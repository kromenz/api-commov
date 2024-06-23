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

// GET: A single user by email or username
userRouter.get("/:identifier", async (request: Request, response: Response) => {
  const identifier: string = request.params.identifier;
  try {
    const user = await UserService.getUserByEmailOrUsername(identifier);
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

    const existingUser =
      (await UserService.getUserByEmailOrUsername(user.email)) ||
      (await UserService.getUserByEmailOrUsername(user.username));

    if (existingUser) {
      console.error("user exists");
      return res.status(400).json({ error: "exists" });
    }

    const newUser = await UserService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar utilizador:", error);
    res.status(500).json({ error: "Erro ao criar utilizador" });
  }
});

// PUT: Update User Information
userRouter.put("/update", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const userData = req.body.userData;

    const user = await UserService.getUserByEmailOrUsername(email);

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with email ${email} not found` });
    }

    if (userData.email || userData.username) {
      const existingUser =
        (await UserService.getUserByEmailOrUsername(userData.email)) ||
        (await UserService.getUserByEmailOrUsername(userData.username));

      if (existingUser && existingUser.uuid !== user.uuid) {
        return res.status(400).json({ error: "exists" });
      }
    }

    const updatedUser = await UserService.updateUser(user.uuid, userData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});
