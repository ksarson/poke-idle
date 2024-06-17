import React, { useState } from "react";
import PropTypes from "prop-types";

const regions = [
  {
    name: "Kanto",
    routes: ["Route 1", "Route 2", "Route 3"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Johto",
    routes: ["Route 29", "Route 30", "Route 31"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Hoenn",
    routes: ["Route 101", "Route 102", "Route 103"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Sinnoh",
    routes: ["Route 201", "Route 202", "Route 203"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Unova",
    routes: ["Route 19", "Route 20", "Route 21"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Kalos",
    routes: ["Route 1", "Route 2", "Route 3"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Alola",
    routes: ["Route 1", "Route 2", "Route 3"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Galar",
    routes: ["Route 1", "Route 2", "Route 3"],
    gyms: ["Gym 1", "Gym 2"],
  },
  {
    name: "Paldea",
    routes: ["Route 1", "Route 2", "Route 3"],
    gyms: ["Gym 1", "Gym 2"],
  },
];

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

  const toggleRegion = (region: string) => {
    setExpandedRegion(expandedRegion === region ? null : region);
  };

  return (
    <>
      <div className="region-separated-modal">
        {regions.map((region) => (
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
                  region.routes.map((route) => (
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
                  region.gyms.map((gym) => (
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
