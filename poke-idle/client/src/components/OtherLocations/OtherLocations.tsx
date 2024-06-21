import "../../styles/RegionSeparatedModal.scss";
import React from "react";
import { useGlobalState } from "../../context/GlobalStateContext";

const otherLocations: React.FC = () => {
  const { globalState } = useGlobalState();
  return (
    <>
      <h4>Other Locations</h4>
      <div className="other-locations">
        {globalState.activeScreen?.currentLocation.displayName}
      </div>
    </>
  );
};

export default otherLocations;
