import { useEffect, useState } from "react";
import { Region } from "../types/Region";

export const useRegionsFromSession = () => {
  const [regions, setRegions] = useState<Region[] | null>(null);
  const storedRegions = sessionStorage.getItem("regions");

  useEffect(() => {
    if (storedRegions) {
      setRegions(JSON.parse(storedRegions));
    }
  }, [storedRegions]);

  return regions;
};

export default useRegionsFromSession;
