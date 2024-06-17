import "../../styles/GameAreaStructure.scss";
import React from "react";
import PropTypes from "prop-types";
import HomeBase from "../HomeBase/HomeBase";
import Routes from "../Routes/Routes";
import Gyms from "../Gyms/Gyms";

interface PlayAreaProps {
  activeArea: { area: string; subArea: string | null };
  setActiveArea: React.Dispatch<
    React.SetStateAction<{ area: string; subArea: string | null }>
  >;
}

const PlayArea: React.FC<PlayAreaProps> = ({ activeArea }) => {
  return (
    <div className="play-area-container">
      <div className="width-restricted-container">
        {activeArea.area === "homeBase" && <HomeBase />}
        {activeArea.area === "routes" && <Routes activeArea={activeArea} />}
        {activeArea.area === "gyms" && <Gyms activeArea={activeArea} />}
      </div>
    </div>
  );
};

PlayArea.propTypes = {
  activeArea: PropTypes.exact({
    area: PropTypes.string.isRequired,
    subArea: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
  setActiveArea: PropTypes.func.isRequired,
};

export default PlayArea;
