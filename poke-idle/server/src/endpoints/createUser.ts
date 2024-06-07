import { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI as string);
const dbName = "pokeIdleDb";
const collectionName = "users";

const createUser = async (_req: Request, res: Response) => {
  try {
    const db: Db = client.db(dbName);
    const collection = db.collection(collectionName);

    const { username, password } = _req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
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
      party: [],
    };

    await collection.insertOne(newUser);

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user: ", error.message);
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

export default createUser;
