import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CreationHubCard from "./CreationHubCards";
import { CreationHubIcon } from "../../icon/CreationHubIcon";
import "../CreateVideo/style.scss";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import CreationHubSvg from "./svg/CreationHubSvg";


function CreationHub() {
  const navigate = useNavigate();

  return (
    <div className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2" >
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <CreationHubSvg />
        <BreadCrumbs title="Creation Hub" data={[{ title: "Creation Hub", link: "/creationhub" }]} />
      </div>
      {/* <div className="overflow-auto scrollbar h-100 w-100"> */}

      <div className="component dark-theme-component w-100">
        <CreationHubCard />
      </div>
    </div>
    // </div >
  );
}

export default CreationHub;
