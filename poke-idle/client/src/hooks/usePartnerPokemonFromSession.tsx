import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";

export const usePartnerPokemonFromSession = (): Pokemon | null => {
  const [partnerPokemon, setPartnerPokemon] = useState<Pokemon | null>(null);
  const storedPartnerPokemon = sessionStorage.getItem("partnerPokemon");

  useEffect(() => {
    if (storedPartnerPokemon && storedPartnerPokemon !== "undefined") {
      setPartnerPokemon(JSON.parse(storedPartnerPokemon));
    }
  }, [storedPartnerPokemon]);

  return partnerPokemon;
};

export default usePartnerPokemonFromSession;
