import "../../styles/GameAreaStructure.scss";
import React from "react";
import PropTypes from "prop-types";

interface GameSubMenuProps {
  menuItemList: string[];
}

const GameSubMenu: React.FC<GameSubMenuProps> = ({ menuItemList }) => {
  return (
    <div className="menu visit-menu">
      {menuItemList.map((menuItem: string, index: number) => (
        <button key={index} className="sub-menu-button">
          <p>{menuItem}</p>
        </button>
      ))}
    </div>
  );
};

GameSubMenu.propTypes = {
  menuItemList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default GameSubMenu;
