import React, { useState } from "react";
import "../assets/scss/deactivated-modal/DeactivatedModal.scss";
import { Button } from "react-bootstrap";
import { AuthApi } from "../helpers/api/AuthApi";
import { toast } from "react-hot-toast";
import { Spinner } from "reactstrap";
import { deactivateSelectorState } from "../redux/selectors/deactivateSelector";
import { useSelector } from "react-redux";
import { useSkin } from "@hooks/useSkin";

export const DeactivatedModal = () => {
  const { skin } = useSkin()
  const [state, setState] = useState({
    loading: false,
  });
  const deactivateState = useSelector(deactivateSelectorState);

  const activateAccount = async () => {
    setState({
      ...state,
      loading: true,
    });

    const res = await AuthApi.activateAccount();

    if (res?.success) {
      location?.reload();
      return;
    }

    setState({
      ...state,
      loading: false,
    });

    toast.error("Something went wrong!");

    console.log("Something went wrong!", res?.errors);
  };

  const handleLogout = () => {
    AuthApi.logout();

    location.reload();
  };

  if (deactivateState === true)
    return (
      <div className="modal-container dark-modal-container">
        <div className="deactivatedModal-all dark-deactivatedModal-all">
          <div className="deactivatedModal-secong-bg-div">
            <div className="icon">
              <div className="close-icon"></div>
            </div>
            <div>
              <div className="text-center">
                <b className="account-text">
                  Your Account has been
                  <br />
                  <span style={{ color: "#EA5455" }}>Deactivated!</span>
                </b>
              </div>
              <div className="p-tag-text">
                <h4>
                  Please activate your account, to continue using application Or
                  logout
                </h4>
              </div>
              <div className="button-div">
                <div className="button-bg-div dark-button-bg-div">
                  <Button
                    color="primary"
                    onClick={activateAccount}
                    className="m-1 p-2 activate-button"
                    style={{ fontSize: "15px" }}
                    disabled={state.loading}
                  >
                    Activate Account
                    {state.loading ? (
                      <spam style={{ marginLeft: "10px" }}>
                        <Spinner style={{ width: '1rem', height: "1rem" }} color="light" />
                      </spam>
                    ) : null}
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleLogout}
                    className="m-1 p-2 logout-button"
                    style={{ fontSize: "15px" }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return null;
};
