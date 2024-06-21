import "../../styles/GameAreaStructure.scss";
import React from "react";
import { useGlobalState } from "../../contexts/GlobalStateContext";
import Routes from "../Routes/Routes";
import Gyms from "../Gyms/Gyms";
import OtherLocations from "../OtherLocations/OtherLocations";

const PlayAreaGameContainer: React.FC = () => {
  const { globalState } = useGlobalState();
  return (
    <>
      <div className="play-area-header">
        <h4>
          {globalState.activeScreen &&
            (globalState.activeScreen?.currentRegion.name)
              .charAt(0)
              .toUpperCase() +
              (globalState.activeScreen?.currentRegion.name).slice(1)}
        </h4>
        {globalState.activeScreen?.currentLocation.displayName}
      </div>
      <div className="play-area-conent">
        {globalState.activeScreen?.currentGameArea === "routes" && <Routes />}
        {globalState.activeScreen?.currentGameArea === "gyms" && <Gyms />}
        {globalState.activeScreen?.currentGameArea === "otherLocations" && (
          <OtherLocations />
        )}
      </div>
    </>
  );
};

export default PlayAreaGameContainer;
