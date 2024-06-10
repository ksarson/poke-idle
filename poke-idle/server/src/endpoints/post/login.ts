import { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI as string);
const dbName = "pokeIdleDb";
const collectionName = "users";

const login = async (_req: Request, res: Response) => {
  try {
    const db: Db = client.db(dbName);
    const collection = db.collection(collectionName);

    const { username, password } = _req.body;
    if (!username || !password) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Username and password are required.",
      });
    }

    const user = await db.collection(collectionName).findOne({ username });
    if (!user) {
      return res.status(401).json({
        isSuccessful: false,
        message: "Invalid username or password.",
      });
    }

    const { passwordHash, ...playerInfo } = user;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    const existingUser = await collection.findOne({ username });
    if (existingUser && isPasswordValid) {
      const loginTs = new Date();
      await db
        .collection(collectionName)
        .updateOne({ username: username }, { $set: { lastLogin: loginTs } });
      playerInfo.lastLogin = loginTs;

      return res.status(200).json({
        isSuccessful: true,
        message: "User Login Successful.",
        player: playerInfo,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in: ", error.message);
      res.status(500).json({ isSuccessful: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ isSuccessful: false, message: "An unknown error occurred." });
    }
  }
};

export default login;
