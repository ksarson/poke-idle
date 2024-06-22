import { Request, Response } from "express";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

const getPartnerPokemon = async (
  req: Request<{ pokemonName: string }>,
  res: Response
) => {
  try {
    const pokemonName = req.params.pokemonName;
    console.log(`Fetching partner pokemon '${pokemonName}' from server...`);
    const pokemon = await P.getPokemonByName(pokemonName);
    res.json(pokemon);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching partner pokemon:", error.message);
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export default getPartnerPokemon;
