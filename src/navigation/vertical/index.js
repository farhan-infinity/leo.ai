
import DashboardSvg from "./DashboardSvg.js";
import { CreateHubSvg } from "./CreateHubSvg.js";
import DocumentSvg from "./DocumentSvg.js";
import SettingSvg from "./SettingSvg.js";
import AffiliateSvg from "./AffiliateSvg.js";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <DashboardSvg />,
    navLink: "/home",
  },
  {
    id: "creationHub",
    title: "Creation Hub",
    icon: <CreateHubSvg />,
    navLink: "/creationhub",
  },
  {
    id: "createVideo",
    title: "Create Video",
    icon: <CreateHubSvg />,
    navLink: "/create-video",
  },
  {
    id: "document",
    title: "Document",
    icon: <DocumentSvg />,
    navLink: "/document",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <SettingSvg />,
    navLink: "/settings",
  },
  {
    id: "affiliate",
    title: "Affiliate Center",
    icon: <AffiliateSvg />,
    navLink: "/affiliate",
  },

];
