import { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI as string);
const dbName = "pokeIdleDb";
const collectionName = "users";

const createUser = async (
  req: Request<{ username: string; password: string }>,
  res: Response
) => {
  try {
    const db: Db = client.db(dbName);
    const collection = db.collection(collectionName);

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Username and password are required.",
      });
    }

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ isSuccessful: false, message: "Username already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      passwordHash,
      createdAt: new Date(),
      lastLogin: new Date(),
      level: 1,
      seen: [],
      caught: [],
      partner: "",
      party: [],
    };

    await collection.insertOne(newUser);

    res
      .status(200)
      .json({ isSuccessful: true, message: "User created successfully." });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user: ", error.message);
      res.status(500).json({ isSuccessful: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ isSuccessful: false, message: "An unknown error occurred." });
    }
  }
};

export default createUser;
