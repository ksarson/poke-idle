import "../../styles/GameAreaStructure.scss";
import React from "react";
import { useGlobalState } from "../../context/GlobalStateContext";
import HomeBase from "../HomeBase/HomeBase";
import Routes from "../Routes/Routes";
import Gyms from "../Gyms/Gyms";
import OtherLocations from "../OtherLocations/OtherLocations";

const PlayArea: React.FC = () => {
  const { globalState } = useGlobalState();
  console.log("globalState PlayArea: ", globalState);
  return (
    <div className="play-area-container">
      <div className="width-restricted-container">
        {globalState.activeScreen?.currentGameArea === "homeBase" && (
          <HomeBase />
        )}
        {globalState.activeScreen?.currentGameArea === "routes" && <Routes />}
        {globalState.activeScreen?.currentGameArea === "gyms" && <Gyms />}
        {globalState.activeScreen?.currentGameArea === "otherLocations" && (
          <OtherLocations />
        )}
      </div>
    </div>
  );
};

export default PlayArea;
