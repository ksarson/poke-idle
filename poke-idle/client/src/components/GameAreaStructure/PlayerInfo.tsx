import "../../styles/GameAreaStructure.scss";
import React from "react";
import usePlayerInfoFromSession from "../../hooks/usePlayerInfoFromSession";

const PlayerInfo: React.FC = () => {
  const playerInfo = usePlayerInfoFromSession();
  return (
    <div className="player-info-container">
      {playerInfo && (
        <div className="width-restricted-container">
          <div className="player-info-item">
            <p>
              <strong>Trainer:</strong>
            </p>
            <p>{playerInfo.username ? playerInfo.username : ""}</p>
          </div>
          <div className="player-info-item">
            <p>
              <strong>Partner:</strong>
            </p>
            <p>{playerInfo.party[0] ? playerInfo.party[0] : ""}</p>
          </div>
          <p className="player-info-item">
            <strong>Level :</strong>
            {playerInfo.level ? " " + playerInfo.level : ""}
          </p>
          <p className="player-info-item">
            <strong>Caught :</strong>
            {playerInfo.caught.length ? " " + playerInfo.caught.length : ""}
          </p>
        </div>
      )}
      {!playerInfo && <h6>No Player Info!</h6>}
    </div>
  );
};

export default PlayerInfo;
