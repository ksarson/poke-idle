import "../../styles/GameAreaStructure.scss";
import React from "react";
import usePlayerInfoFromSession from "../../hooks/usePlayerInfoFromSession";
import usePartnerPokemonFromSession from "../../hooks/usePartnerPokemonFromSession";

const PlayerInfo: React.FC = () => {
  const playerInfo = usePlayerInfoFromSession();
  const partnerPokemon = usePartnerPokemonFromSession();

  return (
    <div className="player-info-container">
      {playerInfo && (
        <div className="width-restricted-container">
          <div className="player-info-img">
            <img
              src={partnerPokemon?.sprites.front_default || ""}
              alt="Partner Pokemon"
            />
          </div>

          <div className="player-info-items-container">
            <div className="player-info-item-long">
              <p>
                <strong>Trainer:</strong>
              </p>
              <p>{playerInfo.username ? playerInfo.username : ""}</p>
            </div>

            <p className="player-info-item-short">
              <strong>Level :</strong>
              {playerInfo.level ? " " + playerInfo.level : ""}
            </p>

            <div className="player-info-item-long">
              <p>
                <strong>Partner:</strong>
              </p>
              <p>
                {partnerPokemon?.name
                  ? partnerPokemon.name.charAt(0).toUpperCase() +
                    partnerPokemon.name.slice(1)
                  : ""}
              </p>
            </div>

            <p className="player-info-item-short">
              <strong>Caught :</strong>
              {playerInfo.caught.length ? " " + playerInfo.caught.length : ""}
            </p>
          </div>
        </div>
      )}
      {!playerInfo && <h6>No Player Info!</h6>}
    </div>
  );
};

export default PlayerInfo;
