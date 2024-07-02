import "../../styles/PageStructure.scss";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../contexts/GlobalStateContext";
import useRegionsFromSession from "../../hooks/useRegionsFromSession";
import usePlayerInfoFromSession from "../../hooks/usePlayerInfoFromSession";
import usePartnerPokemonFromSession from "../../hooks/usePartnerPokemonFromSession";
import PlayerInfo from "../GameAreaStructure/PlayerInfo";
import GameMenus from "../GameAreaStructure/GameMenus";
import PlayArea from "../GameAreaStructure/PlayArea";
import Modal from "../Modal/Modal";
import RegionSeparatedModal from "../Modal/RegionSeparatedModal";

const Main: React.FC = () => {
  const { setGlobalState } = useGlobalState();
  const regions = useRegionsFromSession();
  const playerInfo = usePlayerInfoFromSession();
  const partnerPokemon = usePartnerPokemonFromSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    if (regions !== null) {
      console.log("setting regions: ", regions);
      setGlobalState((prevState) => ({
        ...prevState,
        regions: regions,
      }));
    }
    if (playerInfo !== null) {
      console.log("setting playerInfo: ", playerInfo);
      setGlobalState((prevState) => ({
        ...prevState,
        playerInfo: playerInfo,
      }));
    }
    if (partnerPokemon !== null) {
      console.log("setting partnerPokemon: ", partnerPokemon);
      setGlobalState((prevState) => ({
        ...prevState,
        partnerPokemon: partnerPokemon,
      }));
    }
  }, [regions, playerInfo, partnerPokemon]);

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };

  return (
    <main>
      <PlayerInfo />
      <PlayArea />
      <GameMenus setModalType={setModalType} openModal={openModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        size="small"
      >
        <RegionSeparatedModal modalType={modalType} onClose={closeModal} />
      </Modal>
    </main>
  );
};

export default Main;
