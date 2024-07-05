import { Mail, Home, Video } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail />,
    navLink: "/second-page",
  },
  {
    id: "createVideo",
    title: "Create Video",
    icon: <Video />,
    navLink: "/create-video",
  },
];
