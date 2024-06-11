import "../../styles/PageStructure.scss";
import React from "react";
import PlayerInfo from "../GameAreaStructure/PlayerInfo";
import GameMenus from "../GameAreaStructure/GameMenus";
import PlayArea from "../GameAreaStructure/PlayArea";

const Main: React.FC = () => {
  return (
    <main>
      <PlayerInfo />
      <PlayArea />
      <GameMenus />
    </main>
  );
};

export default Main;
