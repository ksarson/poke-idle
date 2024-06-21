//import axios from "axios";
import { Pokemon } from "../types/Pokemon";

const getPartnerPokemon: () => Promise<Pokemon> = async () => {
  try {
    console.log("Fetching partner pokemon from server...");
    const response = await fetch(
      "http://localhost:3000/api/pokemon/partnerPokemon",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Pokemon = await response.json();
    sessionStorage.setItem("partnerPokemon", JSON.stringify(data));
    console.log("Partner pokemon fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching partner pokemon:", error);
    return {} as Pokemon;
  }
};

export default getPartnerPokemon;
