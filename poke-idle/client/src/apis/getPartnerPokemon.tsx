import axios from "axios";
import { Pokemon } from "../types/Pokemon";

const getPartnerPokemon = async (
  pokemonName: string | undefined
): Promise<Pokemon> => {
  try {
    if (!pokemonName) {
      console.log("Player has no Partner Pokemon.");
      return {} as Pokemon;
    }

    console.log("Fetching partner pokemon from server...");
    const response = await axios.get<Pokemon>(
      `http://localhost:3000/api/pokemon/partnerPokemon/${pokemonName}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: { pokemonName: pokemonName },
      }
    );
    const data = response.data;
    sessionStorage.setItem("partnerPokemon", JSON.stringify(data));
    console.log("Partner pokemon fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching partner pokemon:", error);
    return {} as Pokemon;
  }
};

export default getPartnerPokemon;
