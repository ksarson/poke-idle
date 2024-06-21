import { Request, Response } from "express";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

const getPartnerPokemon = async (_req: Request, res: Response) => {
  try {
    console.log("Fetching partner pokemon from server...");
    const pokemon = await P.getPokemonByName("charmander");
    res.json(pokemon);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching partner pokemon");
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export default getPartnerPokemon;
