import "./styles/App.scss";
import React, { useState } from "react";
import Header from "./components/PageStructure/Header";
import Main from "./components/PageStructure/Main";
import LoginLandingPage from "./components/LoginLandingPage/LoginLandingPage";
import Footer from "./components/PageStructure/Footer";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Header />
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
