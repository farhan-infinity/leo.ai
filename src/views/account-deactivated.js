// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Utils
import { } from "@utils";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/not-authorized.svg";
import illustrationsDark from "@src/assets/images/pages/not-authorized-dark.svg";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { AuthApi } from "../helpers/api/AuthApi";
import { ReactToast } from "../@core/components/react-toast/ReactToast";
import { useState } from "react";

const AccountDeactivated = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
  });
  // ** Hooks
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const handleLogOut = () => {
    AuthApi.logout()
    navigate("/login")
  }

  const handleActivate = async () => {
    setState({
      ...state,
      loading: true,
    });

    const res = await AuthApi.activateAccount();
    if (res?.success) {
      AuthApi.logout
      navigate("/login")
      return

    }

    setState({
      ...state,
      loading: false,
    });
    ReactToast({ message: "Something went wrong!", error: true })
    console.log("Something went wrong!", res?.errors);

  }

  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <h2 className="brand-text text-primary ms-1">Leo AI</h2>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <div>
            <h2 className="mb-1">Activate !!</h2>
            <p>You have deactivated your own account, starting using your account by activating it.</p>
            <div className="d-flex gap-1 justify-content-center">
              <Button
                onClick={handleActivate}
                color="primary"
                className="btn-sm-block mb-1"
              >
                Activate
              </Button>
              <Button
                onClick={handleLogOut}
                color="primary"
                className="btn-sm-block mb-1"
              >
                Logout
              </Button>
            </div>
          </div>
          <img className="img-fluid w-75" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export default AccountDeactivated;
