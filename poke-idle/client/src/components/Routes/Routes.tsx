import "../../styles/RegionSeparatedModal.scss";
import React from "react";
import { useGlobalState } from "../../context/GlobalStateContext";

const Routes: React.FC = () => {
  const { globalState } = useGlobalState();
  return (
    <>
      <h4>Routes</h4>
      <div className="routes">
        {globalState.activeScreen?.currentLocation.displayName}
      </div>
    </>
  );
};

export default Routes;
