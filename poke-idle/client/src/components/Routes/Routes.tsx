import "../../styles/RegionSeparatedModal.scss";
import React from "react";
import PropTypes from "prop-types";

interface RoutesProps {
  activeArea: { area: string; subArea: string | null };
}

const Routes: React.FC<RoutesProps> = ({ activeArea }) => {
  return (
    <>
      <h4>Routes</h4>
      <div className="routes">{activeArea.subArea}</div>
    </>
  );
};

Routes.propTypes = {
  activeArea: PropTypes.exact({
    area: PropTypes.string.isRequired,
    subArea: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
};

export default Routes;
