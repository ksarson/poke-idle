import React, { useState } from "react";
import PropTypes from "prop-types";
import useRegionsFromSession from "../../hooks/useRegionsFromSession";
import { Region } from "../../types/Region";

interface RoutesModalProps {
  modalType: string;
  setActiveArea: React.Dispatch<
    React.SetStateAction<{ area: string; subArea: string | null }>
  >;
  onClose: () => void;
}

const RoutesModal: React.FC<RoutesModalProps> = ({
  modalType,
  setActiveArea,
  onClose,
}) => {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const regions = useRegionsFromSession();

  const toggleRegion = (region: string) => {
    setExpandedRegion(expandedRegion === region ? null : region);
  };

  return (
    <>
      <div className="region-separated-modal">
        {regions &&
          regions.map((region: Region) => (
            <div key={region.name} className="region">
              <div
                className="region-item"
                onClick={() => toggleRegion(region.name)}
              >
                <span className="arrow">
                  {expandedRegion === region.name ? "▲" : "▼"}
                </span>
                {region.name}
                <div className="spacer-div"></div>
              </div>
              {expandedRegion === region.name && (
                <div className="region-sub-list">
                  {modalType === "routes" &&
                    region.routes.map((route: string) => (
                      <div
                        key={route}
                        className="region-sub-list-item"
                        onClick={() => {
                          setActiveArea({ area: "routes", subArea: route });
                          onClose();
                        }}
                      >
                        {route}
                      </div>
                    ))}
                  {modalType === "gyms" &&
                    region.gyms.map((gym: string) => (
                      <div
                        key={gym}
                        className="region-sub-list-item"
                        onClick={() => {
                          setActiveArea({ area: "gyms", subArea: gym });
                          onClose();
                        }}
                      >
                        {gym}
                      </div>
                    ))}
                  {modalType === "otherLocations" &&
                    region.otherLocations.map((otherLocation: string) => (
                      <div
                        key={otherLocation}
                        className="region-sub-list-item"
                        onClick={() => {
                          setActiveArea({
                            area: "otherLocations",
                            subArea: otherLocation,
                          });
                          onClose();
                        }}
                      >
                        {otherLocation}
                      </div>
                    ))}
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
  setActiveArea: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoutesModal;
