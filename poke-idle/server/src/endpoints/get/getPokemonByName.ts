import { Request, Response } from "express";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

const getPokemonByName = async (
  req: Request<{ pokemonName: string }>,
  res: Response
) => {
  try {
    const pokemonName = req.params.pokemonName;
    console.log(`Fetching pokemon '${pokemonName}' from server...`);
    const pokemon = await P.getPokemonByName(pokemonName);
    res.json(pokemon);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching pokemon by name:", error.message);
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export default getPokemonByName;
