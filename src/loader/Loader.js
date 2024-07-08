import React from "react";
// import robotGif from "/img/Robot assistant.gif";
// import loadingGif from "/img/Loader.gif";
// import { useSkin } from "@hooks/useSkin";
import "../assets/scss/loader/loader.scss";
import { Spinner } from "reactstrap";

export const Loader = () => {
  // const { skin, setSkin } = useSkin();
  return (
    <div className="loader-container  dark-theme-maincard">
      <div className="loader d-flex justify-content-center align-content-center align-items-center gap-1">
        <Spinner
          color="primary"
          style={{
            height: "1rem",
            width: "1rem",
          }}
          type="grow"
        >
          Loading...
        </Spinner>
        <Spinner
          color="primary"
          style={{
            height: "2rem",
            width: "2rem",
          }}
          type="grow"
        >
          Loading...
        </Spinner>
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
          }}
          type="grow"
        >
          Loading...
        </Spinner>
        <Spinner
          color="primary"
          style={{
            height: "2rem",
            width: "2rem",
          }}
          type="grow"
        >
          Loading...
        </Spinner>
        <Spinner
          color="primary"
          style={{
            height: "1rem",
            width: "1rem",
          }}
          type="grow"
        >
          Loading...
        </Spinner>
        {/* <img className="robot-loader-img" src={robotGif} alt="decor-right" />

        <img className="loader-img" src={loadingGif} alt="decor-right" /> */}
      </div>
    </div>
  );
};
