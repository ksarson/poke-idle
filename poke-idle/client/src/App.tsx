import "./styles/App.scss";
import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
