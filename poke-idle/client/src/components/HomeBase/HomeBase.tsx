import "../../styles/HomeBase.scss";
import React from "react";

const HomeBase: React.FC = () => {
  return (
    <>
      <h4>Home Base</h4>
      <div className="home-base">
        <div className="home-base-object">Spawn Booster</div>
        <div className="home-base-object">Unique Bonus</div>
        <div className="home-base-object">Resource Booster</div>
        <div className="home-base-object">Outpost</div>
        <div className="home-base-object">Power Booster</div>
        <div className="home-base-object">Hatchery</div>
      </div>
    </>
  );
};

export default HomeBase;
