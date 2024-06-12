import "../../styles/GameAreaStructure.scss";
import React, { useEffect, useRef, useState } from "react";

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
            <div className="menu visit-menu">
              <button className="sub-menu-button">
                <p>Visit Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Visit Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Visit Menu</p>
              </button>
            </div>
          )}
          {activeMenu === "objectives" && (
            <div className="menu objectives-menu">
              <button className="sub-menu-button">
                <p>Objectives Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Objectives Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Objectives Menu</p>
              </button>
            </div>
          )}
          {activeMenu === "player" && (
            <div className="menu player-menu">
              <button className="sub-menu-button">
                <p>Player Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Player Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Player Menu</p>
              </button>
            </div>
          )}
          {activeMenu === "info" && (
            <div className="menu info-menu">
              <button className="sub-menu-button">
                <p>Info Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Info Menu</p>
              </button>
              <button className="sub-menu-button">
                <p>Info Menu</p>
              </button>
            </div>
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
