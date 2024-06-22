import "./styles/App.scss";
import React, { useState, useEffect } from "react";
import { GlobalStateProvider } from "./contexts/GlobalStateContext";
import getPokemonsList from "./apis/getPokemonsList";
import getPartnerPokemon from "./apis/getPartnerPokemon";
import getRegions from "./apis/getRegions";
import usePlayerInfoFromSession from "./hooks/usePlayerInfoFromSession";
import Header from "./components/PageStructure/Header";
import Main from "./components/PageStructure/Main";
import LoginLandingPage from "./components/LoginLandingPage/LoginLandingPage";
import Footer from "./components/PageStructure/Footer";

const App: React.FC = () => {
  const playerInfo = usePlayerInfoFromSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    getPokemonsList();
    getPartnerPokemon(playerInfo?.party[0] as string);
    getRegions();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("playerInfo");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const playerInfo = sessionStorage.getItem("playerInfo");
    if (playerInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <GlobalStateProvider>
          <Main />
        </GlobalStateProvider>
      ) : (
        <LoginLandingPage onLoginSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </>
  );
};

export default App;
