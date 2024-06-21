import "../../styles/GameAreaStructure.scss";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useGlobalState } from "../../contexts/GlobalStateContext";
import { Region } from "../../types/Region";
import GameSubMenu from "./GameSubMenu";

interface MenuItem {
  areaRoute: string;
  name: string;
  isModal: boolean;
}

interface GameMenusProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  openModal: (title: string) => void;
}

const GameMenus: React.FC<GameMenusProps> = ({ setModalType, openModal }) => {
  const { globalState, setGlobalState } = useGlobalState();
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

  const handleSubMenuButtonClick = (
    menuItem: MenuItem,
    gameArea: string,
    location: { name: string; displayName: string },
    region: Region
  ) => {
    if (menuItem.isModal) {
      setModalType(menuItem.areaRoute);
      openModal(menuItem.name);
    } else {
      setGlobalState({
        ...globalState,
        activeScreen: {
          currentGameArea: gameArea,
          currentLocation: {
            name: location.name,
            displayName: location.displayName,
          },
          currentRegion: region,
        },
      });
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
            <GameSubMenu
              menuType="visit"
              menuItemList={[
                { areaRoute: "homeBase", name: "Home Base", isModal: false },
                { areaRoute: "routes", name: "Routes", isModal: true },
                { areaRoute: "gyms", name: "Gyms", isModal: true },
                {
                  areaRoute: "otherLocations",
                  name: "Other Locations",
                  isModal: true,
                },
              ]}
              handleSubMenuButtonClick={handleSubMenuButtonClick}
              openModal={openModal}
            />
          )}
          {activeMenu === "objectives" && (
            <GameSubMenu
              menuType={"objectives"}
              menuItemList={[
                { areaRoute: "homeBase", name: "Objectives 1", isModal: false },
                { areaRoute: "homeBase", name: "Objectives 2", isModal: false },
                { areaRoute: "homeBase", name: "Objectives 3", isModal: false },
              ]}
              handleSubMenuButtonClick={handleSubMenuButtonClick}
              openModal={openModal}
            />
          )}
          {activeMenu === "player" && (
            <GameSubMenu
              menuType="player"
              menuItemList={[
                { areaRoute: "homeBase", name: "Player 1", isModal: false },
                { areaRoute: "homeBase", name: "Player 2", isModal: false },
                { areaRoute: "homeBase", name: "Player 3", isModal: false },
              ]}
              handleSubMenuButtonClick={handleSubMenuButtonClick}
              openModal={openModal}
            />
          )}
          {activeMenu === "info" && (
            <GameSubMenu
              menuType="info"
              menuItemList={[
                { areaRoute: "homeBase", name: "Info 1", isModal: false },
                { areaRoute: "homeBase", name: "Info 2", isModal: false },
                { areaRoute: "homeBase", name: "Info 2", isModal: false },
              ]}
              handleSubMenuButtonClick={handleSubMenuButtonClick}
              openModal={openModal}
            />
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

GameMenus.propTypes = {
  setModalType: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default GameMenus;
