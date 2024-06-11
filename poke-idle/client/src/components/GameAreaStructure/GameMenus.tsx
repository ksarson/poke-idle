import "../../styles/GameAreaStructure.scss";
import React from "react";

const GameMenus: React.FC = () => {
  return (
    <div className="game-menus-container">
      <div className="width-restricted-container">
        <button className="menu-button">Visit</button>
        <button className="menu-button">Objectives</button>
        <button className="menu-button">Player</button>
        <button className="menu-button">Info</button>
      </div>
    </div>
  );
};

export default GameMenus;
