import "../../styles/RegionSeparatedModal.scss";
import React from "react";
import PropTypes from "prop-types";

interface GymProps {
  activeArea: { area: string; subArea: string | null };
}

const Gyms: React.FC<GymProps> = ({ activeArea }) => {
  return (
    <>
      <h4>Gyms</h4>
      <div className="gyms">{activeArea.subArea}</div>
    </>
  );
};

Gyms.propTypes = {
  activeArea: PropTypes.exact({
    area: PropTypes.string.isRequired,
    subArea: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
};

export default Gyms;
