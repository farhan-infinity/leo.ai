// ** React Imports
import { Link } from 'react-router-dom'
import ClatterLogo from "../../src/assets/images/logo/Leo-logo-full.png";
import Clatterdark from "../../src/assets/images/logo/Leo-Logo-02.png";
// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";
// ** Icons Imports
import { ChevronLeft } from "react-feather";
import axios from "axios";
// ** Custom Components

import { useSkin } from "@hooks/useSkin";

import InputPassword from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Form,
    Label,
    Button,
    FormFeedback,
    Input,
    Spinner,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom"
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { Domain } from '../utility/Domain';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import CloseIcon from "../@core/assets/svg/cancelSvg"

const Forgot = () => {
    const { skin } = useSkin();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState(null)
    const [emailError, setEmailError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(!loader)
        try {
            const response = await axios.post(`${Domain}/forgot-password`, email)
            setLoader(false)
            toast((t) => (
                <div className='toast-body'>
                    <div>
                        {/* <DangerIcon /> */}
                        {/* <SuccessIcon /> */}
                    </div>
                    <div className='toast-message'>
                        {(response.data.message)}
                    </div>
                    <div className='toast-button-container'>
                        <button className='toast-button' onClick={() => toast.dismiss(t.id)}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            ));
        } catch (error) {
            setLoader(false)
            setEmailError(response.error)
        }
    }

    const source = skin === "dark" ? illustrationsDark : illustrationsLight;

    return (
        <div className='auth-wrapper auth-basic px-2' >
            <div className='auth-inner my-2' >
                <Card className='mb-0' style={{ maxWidth: "460px", width: "100%" }}>
                    <CardBody>
                        <CardBody className="px-0">
                            <img
                                className="brand-full-logo"
                                src={skin === "dark" ? Clatterdark : ClatterLogo}
                                alt="logo"
                            />
                        </CardBody>
                        <CardTitle tag='h4' className='mb-1'>
                            Forgot Password 🔒
                        </CardTitle>
                        <CardText className='mb-2 hidden'>Your new password must be different from previously used passwords</CardText>
                        <Form className='auth-reset-password-form mt-2' onSubmit={(e) => handleSubmit(e)}>
                            <div className='mb-1'>
                                <Label className='form-label' for='new-password'>
                                    Your Email
                                </Label>
                                <Input
                                    className='input-group-merge'
                                    id='text'
                                    autoFocus
                                    onChange={(e) => setEmail({ email: e.target.value })}
                                    placeholder='Enter Your Email'
                                />
                            </div>
                            <div className='mb-1'>
                                <FormFeedback type="invalid">
                                    {emailError}
                                </FormFeedback>
                            </div>
                            <Button
                                disabled={loader ? true : false}
                                type='submit'
                                color='primary'
                                style={{ padding: "15px 30px", borderRadius: "15px", display: "flex", gap: "10px", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <span>Reset Password</span>
                                {loader === true ?
                                    <Spinner style={{
                                        height: '1rem',
                                        width: '1rem'
                                    }}
                                    />
                                    : null}
                            </Button>
                        </Form>
                        <p className='text-center mt-2'>
                            <Link to='/login'>
                                <ChevronLeft className='rotate-rtl me-25' size={14} />
                                <span className='align-middle'>Back to login</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Forgot;
