import "../../styles/RegionSeparatedModal.scss";
import React from "react";
import PropTypes from "prop-types";

interface OtherLocationsProps {
  activeArea: { area: string; subArea: string | null };
}

const otherLocations: React.FC<OtherLocationsProps> = ({ activeArea }) => {
  return (
    <div className="other-locations">
      <h4>Other Location</h4>
      {activeArea.subArea}
    </div>
  );
};

otherLocations.propTypes = {
  activeArea: PropTypes.exact({
    area: PropTypes.string.isRequired,
    subArea: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
};

export default otherLocations;
