import "../../styles/PageStructure.scss";
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isLoggedIn }) => {
  return (
    <header>
      <div className="spacer-div" />
      <h1 className="header-text">Pok&eacute; Idle</h1>
      {isLoggedIn && (
        <button className="logout-button" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      )}
      {!isLoggedIn && <div className="spacer-div" />}
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
