import "../../styles/PageStructure.scss";
import React, { useEffect } from "react";
import getPokemonsList from "../../endpoints/GetPokemonsList";

const Main: React.FC = () => {
  useEffect(() => {
    getPokemonsList();
  }, []);

  return <main>Main</main>;
};

export default Main;
