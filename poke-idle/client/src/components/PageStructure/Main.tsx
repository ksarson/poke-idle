import "../../styles/PageStructure.scss";
import React, { useState } from "react";
import PlayerInfo from "../GameAreaStructure/PlayerInfo";
import GameMenus from "../GameAreaStructure/GameMenus";
import PlayArea from "../GameAreaStructure/PlayArea";
import Modal from "../Modal/Modal";
import RegionSeparatedModal from "../Modal/RegionSeparatedModal";

interface ActiveArea {
  area: string;
  subArea: string | null;
}

const Main: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [activeArea, setActiveArea] = React.useState<ActiveArea>({
    area: "homeBase",
    subArea: null,
  });

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
      <PlayArea activeArea={activeArea} setActiveArea={setActiveArea} />
      <GameMenus
        activeArea={activeArea}
        setActiveArea={setActiveArea}
        setModalType={setModalType}
        openModal={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        size="small"
      >
        <RegionSeparatedModal
          modalType={modalType}
          setActiveArea={setActiveArea}
          onClose={closeModal}
        />
      </Modal>
    </main>
  );
};

export default Main;
