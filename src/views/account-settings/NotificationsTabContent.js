import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Input, Modal, ModalBody, ModalHeader, Progress, Row } from 'reactstrap'
import { useSkin } from "@hooks/useSkin";

const NotificationsTabContent = () => {
    const navigate = useNavigate();
    const localData = JSON.parse(localStorage.getItem("user_data"));
    const [show, setShow] = useState(false);
    const { skin, setSkin } = useSkin();
    const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;
    const background = `${skin === "dark" ? "#0000" : "#EDF5FF"}`;
    return (
        <>
            <Card
                className="child-card dark-theme-child-card h-100 w-100"
                style={{ boxShadow: "none" }}
            >
                <CardHeader>
                    <CardTitle tag="h4" style={{ color: `${theming}` }}>
                        Recent Device
                    </CardTitle>
                </CardHeader>
                <CardTitle>We need permission from your browser to show notifications. Request Permission</CardTitle>
                <CardBody className=" my-1 py-25">
                    <Row>
                        <div className="notification-table dark-notification-table">
                            <div className="notification-table-head dark-notification-table-head">
                                <div className="notification-table-header-row dark-notification-table-header-row">
                                    <div className="notification-table-header">
                                        Type
                                    </div>
                                    <div className="notification-table-header">
                                        Email
                                    </div>
                                    <div className="notification-table-header">
                                        Browser
                                    </div>
                                    <div className="notification-table-header">
                                        App
                                    </div>
                                </div>
                            </div>
                            <div className="notification-table-container dark-notification-table-container">
                                <div className="notification-table-body dark-notification-table-body">
                                    <div className="notification-table-row dark-notification-table-row" >
                                        <div className="notification-table-header">1</div>
                                        <div className="notification-table-header">2</div>
                                        <div className="notification-table-header">3</div>
                                        <div className="notification-table-header">4</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default NotificationsTabContent