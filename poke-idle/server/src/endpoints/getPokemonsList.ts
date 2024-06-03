import { Request, Response } from "express";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

const getPokemonsList = async (_req: Request, res: Response) => {
  try {
    console.log("Fetching pokemon list from server...");
    const pokemon = await P.getPokemonsList();
    res.json(pokemon);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching pokemon list");
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export default getPokemonsList;
