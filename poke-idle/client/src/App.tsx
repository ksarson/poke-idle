import "./styles/App.scss";
import React, { useState, useEffect } from "react";
import Header from "./components/PageStructure/Header";
import Main from "./components/PageStructure/Main";
import LoginLandingPage from "./components/LoginLandingPage/LoginLandingPage";
import Footer from "./components/PageStructure/Footer";
import getPokemonsList from "./api/getPokemonsList";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    getPokemonsList();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("playerInfo");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const playerInfo = sessionStorage.getItem("playerInfo");
    console.log(playerInfo);
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
        <Main />
      ) : (
        <LoginLandingPage onLoginSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </>
  );
};

export default App;
