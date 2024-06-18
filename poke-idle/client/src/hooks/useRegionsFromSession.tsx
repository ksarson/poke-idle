import { useEffect, useState } from "react";
import { Region } from "../types/Region";

export const useRegionsFromSession = () => {
  const [regions, setRegions] = useState<Region[] | null>(null);

  useEffect(() => {
    const storedRegions = sessionStorage.getItem("regions");
    if (storedRegions) {
      setRegions(JSON.parse(storedRegions));
    }
  }, []);

  return regions;
};

export default useRegionsFromSession;
