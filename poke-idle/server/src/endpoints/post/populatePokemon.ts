import { Request, Response } from "express";
import Pokedex from "pokedex-promise-v2";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI as string);
const dbName = "pokeIdleDb";
const collectionName = "pokemon";
const P = new Pokedex();

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

const populatePokemonData = async (_req: Request, res: Response) => {
  try {
    const db: Db = client.db(dbName);
    const collection = db.collection(collectionName);

    const pokemonList: PokemonList = await P.getPokemonsList({ limit: 1025 });
    const pokemonNamesList = pokemonList.results.map((pokemon) => pokemon.name);

    for (const pokemonName of pokemonNamesList) {
      const pokemonData = await fetchPokemonData(pokemonName);
      await collection.updateOne(
        { id: pokemonData.id },
        { $set: pokemonData },
        { upsert: true }
      );
    }

    res.status(200).send("Pokémon data populated successfully.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error populating Pokémon data: ", error.message);
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred.");
    }
  }
};

const fetchPokemonData = async (name: string) => {
  try {
    const pokemon = await P.getPokemonByName(name as string);
    return {
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      is_default: pokemon.is_default,
      order: pokemon.order,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      forms: pokemon.forms.map((form) => form.name),
      game_indices: pokemon.game_indices.map((index) => index.version.name),
      held_items: pokemon.held_items.map((item) => item.item.name),
      location_area_encounters: pokemon.location_area_encounters,
      moves: pokemon.moves.map((move) => move.move.name),
      sprites: pokemon.sprites.front_default,
      cries: pokemon.cries.latest,
      species: pokemon.species.name,
      stats: {
        hp: pokemon.stats.find((stat) => stat.stat.name === "hp")
          ?.base_stat as number,
        attack: pokemon.stats.find((stat) => stat.stat.name === "attack")
          ?.base_stat as number,
        defense: pokemon.stats.find((stat) => stat.stat.name === "defense")
          ?.base_stat as number,
        specialAttack: pokemon.stats.find(
          (stat) => stat.stat.name === "special-attack"
        )?.base_stat as number,
        specialDefense: pokemon.stats.find(
          (stat) => stat.stat.name === "special-defense"
        )?.base_stat as number,
        speed: pokemon.stats.find((stat) => stat.stat.name === "speed")
          ?.base_stat as number,
      },
      types: pokemon.types.map((type) => type.type.name),
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

export default populatePokemonData;
