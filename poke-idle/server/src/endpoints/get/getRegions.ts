import { Request, Response } from "express";
import Pokedex from "pokedex-promise-v2";
import validLocationsByRegion from "../../data/locations/validLocationsByRegion.json" assert { type: "json" };

const P = new Pokedex();
const regions = ["kanto", "johto"];

interface ValidLocationsByRegion {
  [key: string]: {
    routes: string[];
    gyms: string[];
    otherLocations: string[];
  };
}

const getRegions = async (_req: Request, res: Response) => {
  try {
    console.log("Fetching regions from server...");
    const requestedRegions = await P.getRegionByName(regions);
    const filteredRegions = requestedRegions.map(({ name, locations }) => {
      const validRegionLocations: ValidLocationsByRegion =
        validLocationsByRegion || {};
      const routes = validRegionLocations[name].routes || [];
      const gyms = validRegionLocations[name].gyms || [];
      const otherLocations = validRegionLocations[name].otherLocations || [];

      const filteredLocations = locations.filter(
        (location) =>
          routes.includes(location.name) ||
          gyms.includes(location.name) ||
          otherLocations.includes(location.name)
      );
      return {
        name,
        routes,
        gyms,
        otherLocations,
        allValidLocations: filteredLocations,
      };
    });
    res.json(filteredRegions);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching regions");
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export default getRegions;
