import React, { Suspense } from "react";
import "./assets/boxicons-2.1.1/css/boxicons.min.css";
import "./assets/scss/App.scss";
import "./app.scss";
// ** Router Import
import Router from "./router/Router";
import { useDispatch, useSelector } from "react-redux";
import { deactivateStates } from "./redux/deactivate";
import axiosInstace from "./helpers/api/axios";
import { useEffect } from "react";
import { AuthHelpers } from "./auth/auth";
import { subscriptionActions } from "./redux/subscription";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = AuthHelpers.isUserLoggedIn();
  useEffect(() => {
    if (window.location.pathname.includes("success")) return;
    if (!isLoggedIn) {
      return
    } else {
      getProfile();
      getPlan();
    }

  }, [isLoggedIn]);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  async function getProfile() {
    axiosInstace
      .get("/user-profile", axiosConfig)
      .then(function (response) {
        if (response.data.data.status === "deactivated") {
          console.log(response.data.data.status, "res");
          dispatch(deactivateStates({ deactivate_modal: true }));
        }
        return;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getPlan() {
    axiosInstace
      .get("/active-subscription", axiosConfig)
      .then(function (response) {
        if (response.data.data === null) {
          // debugger
          dispatch(
            subscriptionActions.updateModalState({
              subscription_plans_modal: true,
            })
          );
        } else if (response.data.data.free_trial_use === false) {
          dispatch(
            subscriptionActions.updateModalState({
              subscription_plans_modal: true,
            })
          );
        }
        return;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
