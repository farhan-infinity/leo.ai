// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell, Instagram, Video } from "react-feather";

// ** Reactstrap Imports
import {
    Badge,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { notificationStatus } from "../../../../redux/actions/notificationAction";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import PTV from "./svg/PTV";
import TTV from "./svg/TTV";
import SC from "./svg/SC";
import DSvg from "./svg/DSvg";
import SubSvg from "./svg/SubSvg";
import PassSvg from "./svg/PassSvg"
import NotificationSvg from "./svg/NotificationSvg";


const MNotificationDropdown = ({ skin, notificationData }) => {
    const [noti, setNoti] = useState([])
    const [counter, setCounter] = useState(15)
    const [notiLength, setNotiLength] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (notificationData) {
            const newArray = [];
            let length = notificationData.notifications.length
            newArray.push(...notificationData.notifications.slice(0, counter));
            setNoti(newArray)
            if (length === noti.length) {
                setNotiLength(true)
            }
        }
    }, [notificationData, counter])


    const handleNotificationState = (notification) => {
        dispatch(notificationStatus(notification._id))
    }

    const handleShowOldNotification = () => {
        setCounter(counter + 4)
    }

    return (
        <UncontrolledDropdown
            // tag="li"
            className="dropdown-notification nav-item"
        >
            <DropdownToggle key={uuidv4()} className="dropdown-notification-button p-0">
                <NotificationSvg />
                <Badge pill color='primary' className="badge-up">
                    {notificationData?.unReadNotifications}
                </Badge>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-media mt-4">
                <ul className="dropdown-menu-list">
                    <span className="dropdown-menu-header">
                        <DropdownItem className="d-flex" header>
                            <div className="notification-title d-flex gap-1" style={{ color: "#177ffa", fontWeight: "600", fontSize: "20px" }}>
                                <div>
                                    Notifications
                                </div>
                                <div>
                                    <svg width="18" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.33333 2.44444C7.33333 1.09441 8.42775 0 9.77778 0C11.1278 0 12.2222 1.09441 12.2222 2.44444C15.0824 3.7969 16.9628 6.61741 17.1111 9.77778V13.4444C17.2976 14.9854 18.2049 16.3462 19.5556 17.1111H0C1.3507 16.3462 2.25792 14.9854 2.44444 13.4444V9.77778C2.59278 6.61741 4.47313 3.7969 7.33333 2.44444Z" fill="#177FFA" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.10938 17.1111V18.3333C6.10938 20.3584 7.751 22 9.77604 22C11.8011 22 13.4427 20.3584 13.4427 18.3333V17.1111" fill="#177FFA" />
                                    </svg>
                                </div>
                            </div>
                        </DropdownItem>
                    </span>
                    <li className="dropdown-list">
                        <PerfectScrollbar
                            component="li"
                            className="media-list scrollable-container"
                            options={{
                                wheelPropagation: false,
                            }}
                        >
                            {noti !== null || noti !== undefined ? (
                                noti?.map((item, index) => {
                                    return (
                                        <div
                                            key={uuidv4()}
                                            onClick={() => handleNotificationState(item)}
                                            className={classnames(` ${item.read === false ? "list-item-read" : "list-item"}`)}
                                        >
                                            <div className="list-item-icon d-flex justify-content-center align-content-center align-items-center">
                                                <div className="icon">
                                                    {item.type === "document" ? (
                                                        <DSvg />
                                                    ) : null}
                                                    {item.type === "short-clips" ? (
                                                        <SC />
                                                    ) : null}
                                                    {item.type === "Text To Video" ? (
                                                        <TTV />
                                                    ) : null}
                                                    {item.type === "Picture To Video" ? (
                                                        <PTV />
                                                    ) : null}
                                                    {item.type === "subscription" ? (
                                                        <SubSvg />
                                                    ) : null}
                                                    {item.type === "change-password" ? (
                                                        <PassSvg />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="list-item-content">
                                                <div className="list-item-body d-flex flex-row justify-content-between flex-grow-1 text-capitalize">
                                                    {item.type}
                                                    <div className="d-flex justify-content-end">
                                                        {moment(item.createdAt).fromNow()}
                                                    </div>
                                                </div>
                                                <div className="list-item-body flex-grow-1 text-capitalize">
                                                    {item.log}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })) : null
                            }
                            {notiLength === true ? null
                                : (
                                    <>
                                        {noti.length < counter ? null : (
                                            <div onClick={() => handleShowOldNotification()} className="scroll-more d-flex justify-content-center align-content-center align-items-center">Load More</div>
                                        )}
                                    </>
                                )}
                        </PerfectScrollbar>
                    </li>
                </ul>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default MNotificationDropdown;
