import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import getPokemonsList from "./endpoints/getPokemonsList.js";
import createUser from "./endpoints/createUser.js";
import login from "./endpoints/login.js";
//import populatePokemon from "./databaseScripts/populatePokemon.js";

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

    // Use the getPokemonsList endpoint
    app.get("/api/pokemon/list", getPokemonsList);

    // Populate MongoDb Pokemon collection
    // app.get("/api/pokemon/list", populatePokemon);

    // Use the createUser endpoint
    app.post("/api/users/create", createUser);

    // Use the login endpoint
    app.post("/api/users/login", login);

    // Start the Express server
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

startServer();
