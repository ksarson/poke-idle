import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import getPokemonsList from "./endpoints/get/getPokemonsList.js";
import createUser from "./endpoints/post/createUser.js";
import login from "./endpoints/post/login.js";
//import populatePokemon from "./endpoints/post/populatePokemon.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const dbName = "IdleCluster";
const client = new MongoClient(process.env.MONGODB_URI as string);

async function startServer() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName).databaseName;
    console.log(`Cluster: ${db}`);

    // Unused endpoints
    // app.get("/api/pokemon/list", populatePokemon);

    // POST
    app.post("/api/users/create", createUser);
    app.post("/api/users/login", login);

    // PUT

    // GET
    app.get("/api/pokemon/list", getPokemonsList);

    // DELETE

    // Start the Express server
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

startServer();
