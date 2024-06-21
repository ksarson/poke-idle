import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";

export const usePartnerPokemonFromSession = () => {
  const [partnerPokemon, setPartnerPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const partnerPokemon = sessionStorage.getItem("partnerPokemon");
    if (partnerPokemon) {
      setPartnerPokemon(JSON.parse(partnerPokemon));
    }
  }, []);

  return partnerPokemon;
};

export default usePartnerPokemonFromSession;
