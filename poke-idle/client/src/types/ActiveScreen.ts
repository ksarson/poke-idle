import PropTypes from "prop-types";
import { RegionPropType } from "./Region";

export const ActiveScreenPropType = PropTypes.exact({
  currentGameArea: PropTypes.string.isRequired,
  currentLocation: PropTypes.exact({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  currentRegion: RegionPropType.isRequired,
});
