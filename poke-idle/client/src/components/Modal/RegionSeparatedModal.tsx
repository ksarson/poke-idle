import React, { useState } from "react";
import PropTypes from "prop-types";
import { useGlobalState } from "../../context/GlobalStateContext";
import { Region } from "../../types/Region";

interface RoutesModalProps {
  modalType: string;
  onClose: () => void;
}

const RoutesModal: React.FC<RoutesModalProps> = ({ modalType, onClose }) => {
  const { globalState, setGlobalState } = useGlobalState();
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const toggleRegion = (region: string) => {
    setExpandedRegion(expandedRegion === region ? null : region);
  };

  return (
    <>
      <div className="region-separated-modal">
        {globalState.regions &&
          globalState.regions.map((region: Region) => (
            <div key={region.name} className="region">
              <div
                className="region-item"
                onClick={() => toggleRegion(region.name)}
              >
                <span className="arrow">
                  {expandedRegion === region.name ? "▲" : "▼"}
                </span>
                {region.name.charAt(0).toUpperCase() + region.name.slice(1)}
                <div className="spacer-div"></div>
              </div>
              {expandedRegion === region.name && (
                <div className="region-sub-list">
                  {modalType === "routes" &&
                    region.routes.map(
                      (route: { name: string; displayName: string }) => (
                        <div
                          key={route.name}
                          className="region-sub-list-item"
                          onClick={() => {
                            setGlobalState({
                              ...globalState,
                              activeScreen: {
                                currentGameArea: "routes",
                                currentLocation: {
                                  name: route.name,
                                  displayName: route.displayName,
                                },
                                currentRegion: region,
                              },
                            });
                            onClose();
                          }}
                        >
                          {route.displayName}
                        </div>
                      )
                    )}
                  {modalType === "gyms" &&
                    region.gyms.map(
                      (gym: { name: string; displayName: string }) => (
                        <div
                          key={gym.name}
                          className="region-sub-list-item"
                          onClick={() => {
                            setGlobalState({
                              ...globalState,
                              activeScreen: {
                                currentGameArea: "gyms",
                                currentLocation: {
                                  name: gym.name,
                                  displayName: gym.displayName,
                                },
                                currentRegion: region,
                              },
                            });
                            onClose();
                          }}
                        >
                          {gym.displayName}
                        </div>
                      )
                    )}
                  {modalType === "otherLocations" &&
                    region.otherLocations
                      .sort()
                      .map(
                        (otherLocation: {
                          name: string;
                          displayName: string;
                        }) => (
                          <div
                            key={otherLocation.name}
                            className="region-sub-list-item"
                            onClick={() => {
                              setGlobalState({
                                ...globalState,
                                activeScreen: {
                                  currentGameArea: "otherLocations",
                                  currentLocation: {
                                    name: otherLocation.name,
                                    displayName: otherLocation.displayName,
                                  },
                                  currentRegion: region,
                                },
                              });
                              onClose();
                            }}
                          >
                            {otherLocation.displayName}
                          </div>
                        )
                      )}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

RoutesModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoutesModal;
