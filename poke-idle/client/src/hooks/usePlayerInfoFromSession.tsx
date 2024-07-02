import { useEffect, useState } from "react";
import { Player } from "../types/Player";

export const usePlayerInfoFromSession = () => {
  const [playerInfo, setPlayerInfo] = useState<Player | null>(null);
  const storedPlayerInfo = sessionStorage.getItem("playerInfo");

  useEffect(() => {
    if (storedPlayerInfo && storedPlayerInfo !== "undefined") {
      setPlayerInfo(JSON.parse(storedPlayerInfo));
    }
  }, [storedPlayerInfo]);

  return playerInfo;
};

export default usePlayerInfoFromSession;
