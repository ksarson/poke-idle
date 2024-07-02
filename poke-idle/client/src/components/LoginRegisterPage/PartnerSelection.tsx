import "../../styles/PageStructure.scss";
import React, { useState, useEffect } from "react";
import starterPokemon from "../../objects/starterPokemon.json";
import getPokemonByName from "../../apis/pokemon/get/getPokemonByName";
import setPartnerPokemon from "../../apis/pokemon/set/setPartnerPokemon";
import { Pokemon } from "../../types/Pokemon";
import Modal from "../Modal/Modal";
import usePlayerInfoFromSession from "../../hooks/usePlayerInfoFromSession";

const PartnerSelection: React.FC = () => {
  const playerInfo = usePlayerInfoFromSession();
  const starterPokemonList = JSON.parse(JSON.stringify(starterPokemon));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<{
    name: string;
    displayName: string;
    data: Pokemon;
  } | null>(null);
  const [starterPokemonData, setStarterPokemonData] = useState<{
    [key: string]: any[];
  }>({});

  const handlePartnerSelection = (pokemon: {
    name: string;
    displayName: string;
    data: Pokemon;
  }) => {
    setIsModalOpen(true);
    setSelectedPokemon(pokemon);
    console.log("Selected Pokemon:", pokemon.displayName);
  };

  const handlePartnerConfirmation = (pokemonName: string | undefined) => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
    if (playerInfo && pokemonName) {
      setPartnerPokemon(pokemonName, playerInfo.username);
    } else {
      console.log("Not a logged in user or valid pokemon name.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      const newPokemonData: { [key: string]: any[] } = {};

      for (const region in starterPokemonList) {
        newPokemonData[region] = await Promise.all(
          starterPokemonList[region].map(async (pokemon: Pokemon) => {
            const data = await getPokemonByName(pokemon.name);
            return {
              ...pokemon,
              data,
            };
          })
        );
      }
      setStarterPokemonData(newPokemonData);
    };

    fetchPokemonData();
  }, []);

  return (
    <>
      <div className="starter-pokemon-list">
        {Object.keys(starterPokemonData).map((region) => (
          <div
            key={region}
            className={`starters-container ${region}-starters-container`}
          >
            {starterPokemonData[region].map(
              (pokemon: {
                name: string;
                displayName: string;
                data: Pokemon;
              }) => (
                <button
                  key={pokemon.name}
                  className="starter-pokemon-button"
                  onClick={() => handlePartnerSelection(pokemon)}
                >
                  <img
                    className="starter-pokemon-img"
                    src={pokemon.data?.sprites.front_default || ""}
                    alt="Partner Pokemon"
                  />
                </button>
              )
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Are you sure?"}
        size="small"
        disableOutsideClick={false}
      >
        <div className="confirm-partner-container">
          <img
            className="starter-pokemon-img"
            src={selectedPokemon?.data.sprites.front_default || ""}
            alt="Partner Pokemon"
          />
          <div className="confirm-partner-text">
            You have selected <strong>{selectedPokemon?.displayName}!</strong>
            <br />
            {`Are you sure you want to proceed?`}
          </div>
          <div className="partner-confirmation-button-container">
            <button
              className="confirm-button"
              onClick={() => handlePartnerConfirmation(selectedPokemon?.name)}
            >
              <h6>Confirm</h6>
            </button>
            <button className="cancel-button">
              <h6>Cancel</h6>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PartnerSelection;
