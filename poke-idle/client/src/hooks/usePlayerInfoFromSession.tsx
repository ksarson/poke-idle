import { useEffect, useState } from "react";
import { Player } from "../types/Player";

export const usePlayerInfoFromSession = () => {
  const [playerInfo, setPlayerInfo] = useState<Player | null>(null);

  useEffect(() => {
    const storedPlayerInfo = sessionStorage.getItem("playerInfo");
    if (storedPlayerInfo) {
      setPlayerInfo(JSON.parse(storedPlayerInfo));
    }
  }, []);

  return playerInfo;
};

export default usePlayerInfoFromSession;
