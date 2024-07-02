import axios from "axios";
import { Pokemon } from "../../../types/Pokemon";

const getPokemonByName = async (
  pokemonName: string | undefined
): Promise<Pokemon> => {
  try {
    if (!pokemonName) {
      console.log("No Pokemon Name Provided.");
      return {} as Pokemon;
    }

    console.log("Fetching pokemon by name from server...");
    const response = await axios.get<Pokemon>(
      `http://localhost:3000/api/pokemon/${pokemonName}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: { pokemonName: pokemonName },
      }
    );
    const data = await response.data;
    console.log("Pokemon data by name fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching pokemon data by nme:", error);
    return {} as Pokemon;
  }
};

export default getPokemonByName;
