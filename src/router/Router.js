// ** Router imports
import { Navigate, useRoutes } from "react-router-dom";

// ** GetRoutes
import { getRoutes } from "./routes";
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
import { lazy } from "react";
import { getHomeRouteForLoggedInUser, getUserData } from "../utility/Utils";

const Login = lazy(() => import("../views/Login"));
const Register = lazy(() => import("../views/Register"));
const ForgotPassword = lazy(() => import("../views/ForgotPassword"));
const Forget = lazy(() => import("../views/Forget"));
const Error = lazy(() => import("../views/Error"));
const NotAuthorized = lazy(() => import("../views/NotAuthorized"))
const AccountBanned = lazy(() => import("../views/account-banned"))
const AccountDeactivated = lazy(() => import("../views/account-deactivated"))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();
  const user = getUserData()

  const allRoutes = getRoutes(layout);
  const getHomeRoute = () => {
    if (user) {
      return getHomeRouteForLoggedInUser(user)
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{
        path: '/login', element: <Login />
      }]
    },
    {
      path: "/register",
      element: <BlankLayout />,
      children: [{
        path: '/register', element: <Register />,
      }]
    },
    {
      path: "/register/:fpr",
      element: <BlankLayout />,
      children: [{
        path: "/register/:fpr", element: <Register />,
      }],
    },
    {
      path: "/forgot-password",
      element: <BlankLayout />,
      children: [{
        path: "/forgot-password", element: <Forget />,
      }],
    },
    {
      path: "/reset-password",
      element: <BlankLayout />,
      children: [{
        path: "/reset-password", element: <ForgotPassword />,
      }],
    },
    {
      path: "/error",
      element: <BlankLayout />,
      children: [{
        path: "/error", element: <Error />,
      }],
    },

    {
      path: '/account-banned',
      element: <BlankLayout />,
      status: "banned",
      children: [{
        path: '/account-banned', element: <AccountBanned />
      }]
    },
    {
      path: '/account-deactivated',
      element: <BlankLayout />,
      status: "deactivated",
      children: [{
        path: '/account-deactivated', element: <AccountDeactivated />
      }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{
        path: '/auth/not-auth', element: <NotAuthorized />
      }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{
        path: '*', element: <Error />
      }]
    },
    ...allRoutes]);

  return routes;
};

export default Router;
