import React from "react";
import robotGif from "/img/Robot assistant.gif";
import loadingGif from "/img/Loader.gif";
import { useSkin } from "@hooks/useSkin";
import "../assets/scss/loader/loader.scss";

export const Loader = () => {
  const { skin, setSkin } = useSkin();
  return (
    <div className="loader-container  dark-theme-maincard">
      <div className="loader">
        <img className="robot-loader-img" src={robotGif} alt="decor-right" />

        <img className="loader-img" src={loadingGif} alt="decor-right" />
      </div>
    </div>
  );
};
