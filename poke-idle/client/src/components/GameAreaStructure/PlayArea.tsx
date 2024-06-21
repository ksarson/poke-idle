import "../../styles/GameAreaStructure.scss";
import React from "react";
import { useGlobalState } from "../../contexts/GlobalStateContext";
import HomeBase from "../HomeBase/HomeBase";
import PlayAreaGameContainer from "./PlayAreaGameContainer";

const PlayArea: React.FC = () => {
  const { globalState } = useGlobalState();
  return (
    <div className="play-area-container">
      <div className="width-restricted-container">
        {globalState.activeScreen?.currentGameArea === "homeBase" && (
          <HomeBase />
        )}
        {(globalState.activeScreen?.currentGameArea === "routes" ||
          globalState.activeScreen?.currentGameArea === "gyms" ||
          globalState.activeScreen?.currentGameArea === "otherLocations") && (
          <PlayAreaGameContainer />
        )}
      </div>
    </div>
  );
};

export default PlayArea;
