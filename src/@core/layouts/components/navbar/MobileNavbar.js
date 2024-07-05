// ** React Imports
import React, { useState, Fragment, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

// ** Custom Components
import NavbarUser from "./NavbarUser";
import NavbarSearch from "./NavbarSearch";
// ** Third Party Components
import { Sun, Menu } from "react-feather";
import Moon from "../../../../../assets/icon/moon";
// ** Reactstrap Imports
import * as Icon from "react-feather";

import { NavItem, NavLink } from "reactstrap";
import Avatar from "@components/avatar";
import { LocalStorageHelpers } from "../../../../helpers/localStoraga";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../../../helpers/api/AuthApi";
import MNotificationDropdown from "./MNotificationDropdown";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import { Socket } from "../../../../utility/Domain"

const MobileNavbar = (props) => {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState(false)
    const [subShow, setSubShow] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [notificationData, setNotificationData] = useState(null)
    const { notiStatus } = useSelector(state => state.notification)
    const { postSuggestion } = useSelector(state => state.suggestion)
    const { postVideo } = useSelector(state => state.createVideo)
    const { postAvatar } = useSelector(state => state.createVideo)
    const { postTextVideo } = useSelector(state => state.createVideo)
    const { postClips } = useSelector(state => state.createVideo)
    const { resetPass } = useSelector(state => state.authUser)

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    // ** Props
    const { skin, setSkin, setMenuVisibility } = props;

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

    useEffect(() => {
        const data = LocalStorageHelpers.getUserData();
        if (data) {
            setUserData({ ...userData, ...data });
        }
    }, []);


    const handleUpgrade = () => {
        setSubShow(!subShow)
        let upgrade = {
            upgradeModal: !subShow
        }
        localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
    }

    const handleAvatarClick = () => {
        navigate("/settings")
    }

    const userLogout = async () => {
        AuthApi.logout();
        location.replace("/login");
    };

    const handleSearchInput = () => {
        setSearchInput(!searchInput)
    }

    return (
        <Fragment>
            <ul className="navbar-ul dark-navbar-ul">
                <div className="d-flex gap-1 justify-content-start navbar-ul-child dark-navbar-ul-child">
                    <div className="theme-button dark-theme-button" onClick={() => setMenuVisibility(true)} >
                        <NavItem className="mobile-menu me-auto">
                            <NavLink
                                className="nav-menu-main menu-toggle hidden-xs is-active"
                                onClick={() => setMenuVisibility(true)}
                            >
                                <Menu className="ficon" />
                            </NavLink>
                        </NavItem>
                    </div>
                    {searchInput === false && (
                        <div className="hidden-search-input dark-search-input">
                            <div className="search-icon">
                                <Icon.Search onClick={() => handleSearchInput()} />
                            </div>
                        </div>
                    )}
                </div>
                {searchInput === true ? (
                    < NavbarSearch setSearchInput={setSearchInput} searchInput={searchInput} />
                ) : (
                    <div className="d-flex gap-1 mobile-navbar">
                        <div className="theme-button dark-theme-button">
                            <NavItem>
                                <div
                                    className="nav-link-style dark-theme-nav-link-style p-0"
                                >
                                    <MNotificationDropdown skin={skin} notificationData={notificationData} />
                                </div>
                            </NavItem>
                        </div>
                        <div className="theme-button dark-theme-button">
                            <NavItem>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={props.direction}>
                                    <DropdownToggle caret>More</DropdownToggle>
                                    <DropdownMenu {...props.args}>
                                        <DropdownItem onClick={() => handleUpgrade()} className="w-100 d-flex justify-content-start gap-1">
                                            <Icon.Star fill={"#FAB709"} stroke={""} className="star-icon" />
                                            Upgrade Now
                                        </DropdownItem>
                                        <DropdownItem onClick={() => { skin === "dark" ? setSkin("light") : setSkin("dark") }} className="w-100 d-flex justify-content-start gap-1">
                                            {skin === "dark" ? (<Sun className="ficon" />) : (<div><Moon /></div>)}
                                            Theme {skin}
                                        </DropdownItem>
                                        <DropdownItem onClick={() => handleAvatarClick()} className="w-100 d-flex justify-content-start gap-1">
                                            <div className="d-flex gap-1">
                                                <Avatar
                                                    initials
                                                    img={userData?.profile_img}
                                                    imgClassName={"avatar-img"}
                                                    content={userData?.username ?? "Test User"}
                                                    contentStyles={{
                                                        width: "100%",
                                                        fontSize: "calc(20px)",
                                                        color: skin === "dark" ? "white" : "#6e6b7b"
                                                    }}
                                                    style={{

                                                        width: "28px !important",
                                                        height: "28px !important",
                                                    }}
                                                />
                                                <div className="d-flex justify-content-center align-content-center align-items-center">My Profile</div>
                                            </div>
                                        </DropdownItem>
                                        <DropdownItem className="w-100 d-flex justify-content-start gap-1" onClick={async () => {
                                            userLogout();
                                        }}>
                                            <div className="w-100 d-flex">
                                                <Icon.LogOut fill={"#FAB709"} stroke={""} className="star-icon" />
                                                <div>
                                                    Logout
                                                </div>
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu >
                                </Dropdown >
                            </NavItem>
                        </div>
                    </div>
                )}
            </ul >
        </Fragment >
    );
};

MobileNavbar.propTypes = {
    direction: PropTypes.string,
};

export default MobileNavbar;
