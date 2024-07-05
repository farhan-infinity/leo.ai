// ** Reactstrap Imports
import {
  Card,
  Button,
  CardHeader,
  CardTitle,
  CardBody,
  Alert,
  Form,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";
// ** Third Party Components
import Swal from "sweetalert2";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import { useState } from "react";
import { AuthApi } from "../../helpers/api/AuthApi";
import { deactivateStates } from "../../redux/deactivate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const defaultValues = {
  confirmCheckbox: false,
};

const MySwal = withReactContent(Swal);

const DeleteAccount = () => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const { skin, setSkin } = useSkin();
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;
  const background = `${skin === "dark" ? "#0000" : "#EDF5FF"}`;

  const [state, setState] = useState({
    loading: false,
  });

  const handleConfirmDelete = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Are you sure you would like to deactivate your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivated!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    const res = await AuthApi.deactivateAccount();

    if (res.success) {
      location.reload();
    }
  };

  const onSubmit = (data) => {
    if (data.confirmCheckbox === true) {
      handleConfirmDelete();
    } else {
      setError("confirmCheckbox", { type: "manual" });
    }
  };

  return (
    <Card className="child-card dark-theme-child-card h-100 w-100" style={{ boxShadow: "none" }}>
      <CardHeader>
        <CardTitle tag="h4" style={{ color: `${theming}` }}>
          Delete Account
        </CardTitle>
      </CardHeader>
      <CardBody className=" my-25 ">
        <div
          className="child-card dark-theme-child-card h-100 w-100 px-2 py-2"
          style={{ backgroundColor: `${background}` }}
        >
          <div className="alert-heading" style={{ color: `${theming}` }}>
            Are you sure you want to deactivate your account?
          </div>
          <div className="alert-heading" style={{ color: `${theming}` }}>
            Once you decativate your account, all your data and credit will be lost and there's no going back.
          </div>
          <div className="alert-heading" style={{ color: `${theming}` }}>
            Please be certain.
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-check mt-2">
            <Controller
              control={control}
              name="confirmCheckbox"
              render={({ field }) => (
                <Input
                  {...field}
                  type="checkbox"
                  id="confirmCheckbox"
                  checked={field.value}
                  invalid={errors.confirmCheckbox && true}
                  style={{ borderColor: "#5A5CD3" }}
                />
              )}
            />
            <Label
              for="confirmCheckbox"
              className={classnames("form-check-label", {
                "text-danger": errors && errors.confirmCheckbox,
              })}
              style={{ color: "#5A5CD3", fontSize: "15px" }}
            >
              I confirm my account deactivation
            </Label>
            {errors && errors.confirmCheckbox && (
              <FormFeedback>
                Please confirm that you want to deactivate account
              </FormFeedback>
            )}
          </div>
          <div className="mt-1">
            <Button
              color="danger"
              className="p-2"
              style={{
                borderRadius: "23px",
              }}
            >
              Deactivate Account
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default DeleteAccount;
