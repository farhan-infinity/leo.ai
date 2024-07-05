// ** React Imports
import { Link, NavLink } from "react-router-dom";
// ** Custom Components
import Avatar from "@components/avatar";
// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Star,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  NavItem,
} from "reactstrap";

// ** Default Avatar Image
import React, { useEffect, useState } from "react";
import { LocalStorageHelpers } from "../../../../helpers/localStoraga";
import { AuthApi } from "../../../../helpers/api/AuthApi";
import NotificationDropdown from "./NotificationDropdown";
import UserAvatarSvg from "./UserAvatarSvg";
import { SubscriptionModal } from "../../../../subscription-modal/SubscriptionModal";
import io from 'socket.io-client';
import { Socket } from "../../../../utility/Domain";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionActions } from "../../../../redux/subscription";

const UserDropdown = ({ skin }) => {
  const dispatch = useDispatch()
  const { subscription_plans_modal } = useSelector((state) => state.subscription)
  const [userData, setUserData] = useState(null);
  const [notificationData, setNotificationData] = useState(null)
  const { notiStatus } = useSelector(state => state.notification)
  const { postSuggestion } = useSelector(state => state.suggestion)
  const { postVideo } = useSelector(state => state.createVideo)
  const { postAvatar } = useSelector(state => state.createVideo)
  const { postTextVideo } = useSelector(state => state.createVideo)
  const { postClips } = useSelector(state => state.createVideo)
  const { resetPass } = useSelector(state => state.authUser)

  useEffect(() => {
    const data = LocalStorageHelpers.getUserData();
    if (data) {
      setUserData({ ...userData, ...data });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const ENDPOINT = `${Socket}`
      const socket = io(ENDPOINT);
      socket.on('connection', () => {
        console.log('Connected to the server');
      });
      let userId = userData.id
      socket.emit('getNotifications', { userId });
      socket.on('fetchedNotifications', (response) => {
        setNotificationData(response)
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [userData, notiStatus, postSuggestion, postVideo, postAvatar, postTextVideo, postClips, resetPass]);

  const logout = async () => {
    AuthApi.logout();
    location.replace("/login");
  };

  const handleUpgrade = () => {
    dispatch(
      subscriptionActions.updateModalState({
        subscription: !subscription_plans_modal,
      })
    );
  }



  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-user nav-item d-flex"
      style={{ gap: "10px" }}
    >
      <SubscriptionModal />
      <div className="theme-button dark-theme-button">
        <Button
          onClick={() => handleUpgrade()}
          type="button"
          color="primary"
          className="user-nav-button"
        >

          <Star fill={"#FAB709"} stroke={""} className="star-icon" />
          Upgrade Now
        </Button>
      </div>

      <div className="theme-button dark-theme-button">
        <NavItem className="d-none d-lg-block">
          {/* <NavLink> */}
          <div
            className="nav-link-style dark-theme-nav-link-style p-0"
          >
            <NotificationDropdown skin={skin} notificationData={notificationData} />
          </div>
          {/* </NavLink> */}
        </NavItem>
      </div>
      <div className="theme-button dark-theme-button" style={{padding: "8px 8px !important"}}>
        <div className="avatar-container">
          <DropdownToggle
            href="/"
            tag="a"
            className="nav-link dropdown-user-link"
            onClick={(e) => e.preventDefault()}
          >
            <div className="user-nav d-sm-flex d-none" >
              <span className="user-name fw-bold">{userData?.userName}</span>
              <span className="user-status">Admin</span>
            </div>

            <div >
              {userData?.profileImage ? (
                <Avatar
                  initials
                  img={userData?.profileImage}
                  // color={selectedUser?.avatarColor || "light-primary"}
                  imgClassName={"avatar-img"}
                  // content={selectedUser?.fullName ?? "Test User"}
                  content={userData?.userName ?? "Test User"}
                  contentStyles={{
                    fontSize: "calc(20px)",
                  }}
                />
              ) : (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  width: "40px",
                }}>
                  <UserAvatarSvg />
                </div>
              )}
            </div>
          </DropdownToggle>
        </div>
      </div>

      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to="/settings">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <Link to={"/settings"}>
          <DropdownItem>
            <Settings size={14} className="me-75" />
            <span className="align-middle">Settings</span>
          </DropdownItem>
        </Link>
        <DropdownItem
          onClick={async () => {
            logout();
          }}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown >
  );
};

export default UserDropdown;
