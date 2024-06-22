import "./styles/App.scss";
import React, { useState, useEffect } from "react";
import { GlobalStateProvider } from "./contexts/GlobalStateContext";
import getPokemonsList from "./apis/getPokemonsList";
import getPartnerPokemon from "./apis/getPartnerPokemon";
import getRegions from "./apis/getRegions";
import usePlayerInfoFromSession from "./hooks/usePlayerInfoFromSession";
import Header from "./components/PageStructure/Header";
import Main from "./components/PageStructure/Main";
import LoginLandingPage from "./components/LoginRegisterPage/LoginLandingPage";
import PartnerSelection from "./components/LoginRegisterPage/PartnerSelection";
import Footer from "./components/PageStructure/Footer";
import ActionRequiredModal from "./components/Modal/ActionRequiredModal";

const App: React.FC = () => {
  const playerInfo = usePlayerInfoFromSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    getPokemonsList();
    getPartnerPokemon(playerInfo?.partner as string);
    getRegions();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("playerInfo");
    sessionStorage.removeItem("partnerPokemon");
    setIsLoggedIn(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkPlayerInfo = sessionStorage.getItem("playerInfo");
    if (checkPlayerInfo) {
      setIsLoggedIn(true);
      if (!playerInfo?.partner) {
        setIsModalOpen(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  let displayPartnerSelection = isLoggedIn && !playerInfo?.partner;
  let displayMain = isLoggedIn;
  let displayLogin = !isLoggedIn;

  return (
    <>
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      {displayLogin && <LoginLandingPage onLoginSuccess={handleLoginSuccess} />}
      {displayPartnerSelection && (
        <ActionRequiredModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Partner Selection"}
          size="small"
          disableOutsideClick={true}
        >
          <PartnerSelection />
        </ActionRequiredModal>
      )}
      {displayMain && (
        <GlobalStateProvider>
          <Main />
        </GlobalStateProvider>
      )}

      <Footer />
    </>
  );
};

export default App;
