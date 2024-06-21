import PropTypes from "prop-types";

export interface Region {
  name: string;
  allValidLocations: { name: string; url: string }[];
  routes: { name: string; displayName: string }[];
  gyms: { name: string; displayName: string }[];
  otherLocations: { name: string; displayName: string }[];
}

export const RegionPropType = PropTypes.exact({
  name: PropTypes.string.isRequired,
  allValidLocations: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  gyms: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  otherLocations: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
});
