import "../../styles/PageStructure.scss";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../contexts/GlobalStateContext";
import useRegionsFromSession from "../../hooks/useRegionsFromSession";
import usePlayerInfoFromSession from "../../hooks/usePlayerInfoFromSession";
import PlayerInfo from "../GameAreaStructure/PlayerInfo";
import GameMenus from "../GameAreaStructure/GameMenus";
import PlayArea from "../GameAreaStructure/PlayArea";
import Modal from "../Modal/Modal";
import RegionSeparatedModal from "../Modal/RegionSeparatedModal";

const Main: React.FC = () => {
  const { setGlobalState } = useGlobalState();
  let regions = useRegionsFromSession();
  let playerInfo = usePlayerInfoFromSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    if (regions !== null) {
      setGlobalState((prevState) => ({
        ...prevState,
        regions: regions,
      }));
    }
    if (playerInfo !== null) {
      setGlobalState((prevState) => ({
        ...prevState,
        playerInfo: playerInfo,
      }));
    }
  }, [regions, playerInfo]);

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
