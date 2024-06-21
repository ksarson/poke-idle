import "./styles/App.scss";
import React, { useState, useEffect } from "react";
import { GlobalStateProvider } from "./context/GlobalStateContext";
import getPokemonsList from "./api/getPokemonsList";
import getRegions from "./api/getRegions";
import Header from "./components/PageStructure/Header";
import Main from "./components/PageStructure/Main";
import LoginLandingPage from "./components/LoginLandingPage/LoginLandingPage";
import Footer from "./components/PageStructure/Footer";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    getPokemonsList();
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
