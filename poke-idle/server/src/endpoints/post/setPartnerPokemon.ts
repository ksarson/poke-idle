import { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URI as string);
const dbName = "pokeIdleDb";
const collectionName = "users";

const setPartnerPokemon = async (
  req: Request<{ pokemonName: string; username: string }>,
  res: Response
) => {
  try {
    const db: Db = client.db(dbName);
    const collection = db.collection(collectionName);

    const pokemonName = req.body.pokemonName;
    if (!pokemonName) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Pokemon name is required.",
      });
    }

    const username = req.body.username;
    if (!username) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Username is required.",
      });
    }

    await collection.updateOne(
      { username },
      { $set: { partner: pokemonName } }
    );

    const player = await collection.findOne({ username });

    const pokemon = await P.getPokemonByName(pokemonName);

    res.status(200).json({
      isSuccessful: true,
      partnerPokemon: pokemon,
      player: player,
      message: "Partner pokemon updated successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error setting partner pokemon:", error.message);
      res.status(500).json({ isSuccessful: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ isSuccessful: false, message: "An unknown error occurred." });
    }
  }
};

export default setPartnerPokemon;
