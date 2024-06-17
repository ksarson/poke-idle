import "../../styles/GameAreaStructure.scss";
import React from "react";
import PropTypes from "prop-types";

interface MenuItem {
  areaRoute: string;
  name: string;
  isModal: boolean;
}

interface GameSubMenuProps {
  menuType: string;
  menuItemList: MenuItem[];
  handleSubMenuButtonClick: (menuItem: MenuItem, subArea: string) => void;
  openModal: (title: string) => void;
}

const GameSubMenu: React.FC<GameSubMenuProps> = ({
  menuType,
  menuItemList,
  handleSubMenuButtonClick,
}) => {
  return (
    <>
      <div className={`menu ${menuType}-menu`}>
        {menuItemList.map((menuItem: MenuItem, index: number) => (
          <button
            key={index}
            className="sub-menu-button"
            onClick={() => handleSubMenuButtonClick(menuItem, menuItem.name)}
          >
            <p>{menuItem.name}</p>
          </button>
        ))}
      </div>
    </>
  );
};

GameSubMenu.propTypes = {
  menuType: PropTypes.string.isRequired,
  menuItemList: PropTypes.arrayOf(
    PropTypes.shape({
      areaRoute: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isModal: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  handleSubMenuButtonClick: PropTypes.func.isRequired,
};

export default GameSubMenu;
