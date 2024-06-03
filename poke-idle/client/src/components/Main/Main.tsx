import "../../styles/Main.scss";
import React, { useEffect } from "react";
import fetchPokemonsList from "../../endpoints/PokemonsList";

const Main: React.FC = () => {
  useEffect(() => {
    fetchPokemonsList();
  }, []);

  return <main>Main</main>;
};

export default Main;
