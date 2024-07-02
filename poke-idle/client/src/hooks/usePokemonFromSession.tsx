import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";

export const usePokemonFromSession = () => {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const storedPokemon = sessionStorage.getItem("pokemonList");

  useEffect(() => {
    if (storedPokemon) {
      setPokemon(JSON.parse(storedPokemon));
    }
  }, [storedPokemon]);

  return pokemon;
};

export default usePokemonFromSession;
