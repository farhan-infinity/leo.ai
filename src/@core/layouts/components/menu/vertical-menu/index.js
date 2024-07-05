// ** React Imports
import { Fragment, useState, useRef } from "react";
import { Link } from "react-feather";
// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

import { LogOut, HelpCircle } from "react-feather";

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";
import { AuthApi } from "../../../../../helpers/api/AuthApi";

import "@styles/react/pages/home/home.scss";
import axiosInstace from "../../../../../helpers/api/axios";
import { useEffect } from "react";
import HelpSvg from "./svg/HelpSvg";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  // ** Props
  const { menuCollapsed, menu, skin, menuData } = props;

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);
  const [data, setData] = useState({});

  // ** Ref
  const shadowRef = useRef(null);
  const { postClips } = useSelector(state => state.createVideo)
  const { postSuggestion } = useSelector(state => state.suggestion)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true);
  };

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };
  const userLogout = async () => {
    AuthApi.logout();
    location.replace("/login");
  };

  useEffect(() => {
    getCredits();
  }, [postClips, postSuggestion]);

  useEffect(() => {
    getCredits();
  }, []);

  async function getCredits() {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axiosInstace
      .get("/dashboard", axiosConfig)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const progressBarValue = (data.credit_count * 100) / data.total_credit;

  // console.log(data)

  return (
    <Fragment>
      <div
        style={{ backgroundColor: "transparent" }}
        className={classnames("main-menu menu-fixed menu-accordion ", {
          expanded: menuHover || menuCollapsed === false,
          "menu-light": skin !== "semi-dark" && skin !== "dark",
          "menu-dark": skin === "semi-dark" || skin === "dark",
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content scrollContent d-flex justify-content-between"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <ul
                className="navigation navigation-main"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "fit-content",
                  backgroundColor: "transparent",
                }}
              >
                <VerticalNavMenuItems
                  items={menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />
              </ul>
              <div
                className="siderbar-bottom d-flex flex-column mt-auto"
              >
                <div
                  className="d-flex flex-column gap-1 collpase-text"
                  style={{ padding: "20px", marginBottom: "10px" }}
                >
                  <div className="card-bg h-100 d-flex flex-column p-1">
                    <div className="d-flex flex-row justify-content-between">
                      <p className=" font-hauora-medium cardSubTitle ">
                        Credit used
                      </p>
                      <p className="font-hauora-medium cardText fw-bolder">
                        {data.credit_count ? data.credit_count : 0}
                      </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p className="font-hauora-medium cardSubTitle flex-end float-end">
                        Total Credits
                      </p>
                      <p className="font-hauora-medium cardText flex-end float-end fw-bolder">
                        {data.total_credit ? data?.total_credit : 0}
                      </p>
                    </div>
                    <div className=" progress-bar">
                      <span
                        className="progress-chart"
                        style={{ width: `${progressBarValue}px` }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <div
                    onClick={async () => {
                      console.log("Help")
                      alert("help")
                      // userLogout();
                    }}
                    className="logout-sidebar d-flex flex-row gap-1 justify-content-start align-items-center cursor-pointer mb-1"
                  >
                    <HelpSvg />
                    <span
                      style={{ fontWeight: "bold" }}
                      className="align-middle text-body-heading collpase-text"
                    >
                      Need Help
                    </span>
                  </div>
                  <div
                    onClick={async () => {
                      userLogout();
                    }}
                    className="mb-3 mx-2 py-1"
                    style={{
                      background:
                        "linear-gradient(90deg, #1970D7 -40.51%, #177FFA 100%)",
                      // border: "1px solid white",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <div className="d-flex flex-row justify-content-center">
                      <LogOut
                        style={{ rotate: "180deg", color: "white" }}
                        className="me-50"
                      />
                      <span
                        style={{ fontWeight: "bold", color: "white" }}
                        className="align-middle text-body-heading collpase-text"
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
