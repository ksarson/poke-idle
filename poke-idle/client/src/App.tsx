import "./styles/App.scss";
import React, { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Header />
      {isLoggedIn ? <Main /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </>
  );
};

export default App;
