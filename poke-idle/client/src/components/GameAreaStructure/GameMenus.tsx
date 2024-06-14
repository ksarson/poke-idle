import "../../styles/GameAreaStructure.scss";
import React, { useEffect, useRef, useState } from "react";
import GameSubMenu from "./GameSubMenu";

const GameMenus: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menuId: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menuId ? null : menuId));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="menu-popups-container">
        <div className="width-restricted-container">
          {activeMenu === "visit" && (
            <GameSubMenu menuItemList={["Visit 1", "Visit 2", "Visit 3"]} />
          )}
          {activeMenu === "objectives" && (
            <GameSubMenu
              menuItemList={["Objectives 1", "Objectives 2", "Objectives 3"]}
            />
          )}
          {activeMenu === "player" && (
            <GameSubMenu menuItemList={["Player 1", "Player 2", "Player 3"]} />
          )}
          {activeMenu === "info" && (
            <GameSubMenu menuItemList={["Info 1", "Info 2", "Info 3"]} />
          )}
        </div>
      </div>
      <div className="menu-buttons-container">
        <div ref={containerRef} className="width-restricted-container">
          <button
            id="visit"
            className={`menu-button ${activeMenu === "visit" ? "active" : ""}`}
            onClick={() => toggleMenu("visit")}
          >
            Visit
          </button>
          <button
            id="objectives"
            className={`menu-button ${
              activeMenu === "objectives" ? "active" : ""
            }`}
            onClick={() => toggleMenu("objectives")}
          >
            Objectives
          </button>
          <button
            id="player"
            className={`menu-button ${activeMenu === "player" ? "active" : ""}`}
            onClick={() => toggleMenu("player")}
          >
            Player
          </button>
          <button
            id="info"
            className={`menu-button ${activeMenu === "info" ? "active" : ""}`}
            onClick={() => toggleMenu("info")}
          >
            Info
          </button>
        </div>
      </div>
    </>
  );
};

export default GameMenus;
