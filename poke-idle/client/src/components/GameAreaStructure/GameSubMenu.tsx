import "../../styles/GameAreaStructure.scss";
import React from "react";
import PropTypes from "prop-types";
import { Region } from "../../types/Region";

interface MenuItem {
  areaRoute: string;
  name: string;
  isModal: boolean;
}

interface GameSubMenuProps {
  menuType: string;
  menuItemList: MenuItem[];
  handleSubMenuButtonClick: (
    menuItem: MenuItem,
    gameArea: string,
    location: { name: string; displayName: string },
    region: Region
  ) => void;
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
            onClick={() =>
              handleSubMenuButtonClick(
                menuItem,
                menuItem.areaRoute,
                { name: "kanto-route-1", displayName: "Route 1" },
                {} as Region
              )
            }
          >
            <p>{menuItem.name}</p>
          </button>
        ))}
      </div>
    </>
  );
};

export const MenuItemListPropType = PropTypes.arrayOf(
  PropTypes.shape({
    areaRoute: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isModal: PropTypes.bool.isRequired,
  }).isRequired
);

GameSubMenu.propTypes = {
  menuType: PropTypes.string.isRequired,
  menuItemList: MenuItemListPropType.isRequired,
  handleSubMenuButtonClick: PropTypes.func.isRequired,
};

export default GameSubMenu;
