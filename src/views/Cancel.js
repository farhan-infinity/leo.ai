import React, { useEffect } from "react";
import Correct from "/img/success-green-check-mark-icon.png";
// import axiosInstace from "../helpers/api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { getUrlParam } from "../utility/Utils";
import { ReactToast } from "../@core/components/react-toast/ReactToast";

const Canceled = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    // const sessionId = getUrlParam("session_id", location.search);

    useEffect(() => {
        subscriptionActivated();
    }, []);

    const subscriptionActivated = () => {
        ReactToast({ message: "Subscription canceled", error: false })
        let userData = JSON.parse(localStorage.getItem("user_data"))
        if (userData) {
            navigate("/")
        } else {
            navigate("/login")
        }
    };
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="card col-md-4 bg-white shadow-md p-5">
                <div
                    className="m-auto mb-4 text-center d-flex justify-content-between"
                    style={{ height: "75px", width: "75px" }}
                >
                    <img
                        src={Correct}
                        className="text-success bi bi-check-circle"
                    ></img>
                </div>
                <div className="text-center">
                    <h1>Subscription not completed!</h1>
                    <p> </p>
                    {/* <button className="btn btn-outline-success">
                            <Link to="/login">Go to Dashboard</Link>
                        </button> */}
                </div>
            </div>
        </div>
    );
};
export default Canceled;
