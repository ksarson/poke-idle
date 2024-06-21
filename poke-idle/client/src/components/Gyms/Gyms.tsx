import "../../styles/RegionSeparatedModal.scss";
import React from "react";
import { useGlobalState } from "../../context/GlobalStateContext";

const Gyms: React.FC = () => {
  const { globalState } = useGlobalState();
  return (
    <>
      <h4>Gyms</h4>
      <div className="gyms">
        {globalState.activeScreen?.currentLocation.displayName}
      </div>
    </>
  );
};

export default Gyms;
