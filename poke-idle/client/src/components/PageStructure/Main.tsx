import "../../styles/PageStructure.scss";
import React, { useEffect } from "react";
import getPokemonsList from "../../api/getPokemonsList";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

const Main: React.FC = () => {
  useEffect(() => {
    getPokemonsList();
  }, []);

  return (
    <main>
      <PlayerInfo />
    </main>
  );
};

export default Main;
