import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import createUser from "./endpoints/post/createUser.js";
import login from "./endpoints/post/login.js";
import getPokemonList from "./endpoints/get/getPokemonList.js";
import getRegions from "./endpoints/get/getRegions.js";
import getPokemonByName from "./endpoints/get/getPokemonByName.js";
import getPartnerPokemon from "./endpoints/get/getPartnerPokemon.js";
import setPartnerPokemon from "./endpoints/post/setPartnerPokemon.js";

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

    // POST
    app.post("/api/users/create", createUser);
    app.post("/api/users/login", login);

    // PUT
    app.put("/api/pokemon/partnerPokemon/update", setPartnerPokemon);

    // GET
    app.get("/api/pokemon/list", getPokemonList);
    app.get("/api/regions/list", getRegions);
    app.get("/api/pokemon/:pokemonName", getPokemonByName);
    app.get("/api/pokemon/partnerPokemon/get/:pokemonName", getPartnerPokemon);

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
