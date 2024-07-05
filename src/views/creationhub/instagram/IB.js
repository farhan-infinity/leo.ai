import React, { useEffect } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import useState from "react-usestateref";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSaveFill } from "react-icons/bs";
import { Breadcrumb, BreadcrumbItem, CardBody, Spinner } from "reactstrap";
import { CreationHubApi } from "../../../helpers/api/creactionHub";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import { SelectLanguage } from "../SelectLanguage";
import IBSvg from "./svg/IBSvg";
import { postSuggestions } from "../../../redux/actions/suggestionAction";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../loader/Loader";
import { emptyPostSuggestion } from "../../../redux/slices/suggestionSlice";
import { subscriptionActions } from "../../../redux/subscription";
import { ReactToast } from "../../../@core/components/react-toast/ReactToast";

const IB = () => {
  const dispatch = useDispatch()
  const [prompt, setPrompt, promptRef] = useState("");
  const [language, setLanguage, languageRef] = useState("English");
  const [data, setData] = useState();
  const { postSuggestion, postSuggestionLoading, postSuggestionError } = useSelector(state => state.suggestion)
  const { subscription_plans_modal } = useSelector((state) => state.subscription)


  const [docId, setDocId, docIdRef] = useState();
  const [show, setShow] = useState(false);
  const [msg, setMsg, msgRef] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (postSuggestion) {
      let suggest = postSuggestion.data?.replace(/(?:\r\n|\r|\n)/g, "<br />")
      setData(suggest)
    }
    if (postSuggestionError) {
      if (postSuggestionError.includes("Insufficient Credit")) {
        dispatch(
          subscriptionActions.updateModalState({
            subscription: !subscription_plans_modal,
          })
        );
        let upgrade = {
          upgradeModal: !subscription_plans_modal
        }
        localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
      } else if (postSuggestionError.includes("Subscription Not Found")) {
        dispatch(
          subscriptionActions.updateModalState({
            subscription: !subscription_plans_modal,
          })
        );
        let upgrade = {
          upgradeModal: !subscription_plans_modal
        }
        localStorage.setItem("upgradeModal", JSON.stringify(upgrade))
      }
    }
  }, [postSuggestion, postSuggestionError])

  useEffect(() => {
    if (data) {
      dispatch(emptyPostSuggestion())
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault();
    var postData = {
      prompt: `${promptRef.current}`,
      language: `${languageRef.current}`,
      type: "instagram_bio",
    };
    dispatch(postSuggestions(postData))
  }

  async function saveDocument(e) {
    e.preventDefault();
    if (docIdRef.current) {
      const id = docIdRef.current;
      const res = await CreationHubApi.saveDocumentCreation(id);
      if (res.success) {
        setMsg("Document Saved Successfully");
        handleShow();
      } else {
        setMsg("First generate content then you can save");
        handleShow();
      }
    } else {
      setMsg("First generate content then you can save");
      handleShow();
    }
  }

  return (
    <Container className="parent-card-2 dark-theme-parent-card-2 dark-theme-parent-card-2">
      <div className="breadCrumb-custom dark-breadCrumb-custom">
        <IBSvg />
        <BreadCrumbs title="Instagram Bio" data={[{ title: "Creation Hub", link: "/creationhub" }, { title: "Instagram", link: "/instagram" }, { title: "Instagram Bio", link: "/instagram_bio" }]} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{msgRef.current}</Modal.Body>
      </Modal>
      <div className="spinner"></div>
      <div className="component dark-theme-component w-100">
        <Row lg={12} className="h-100">
          <Col lg="6" className="h-100">
            <div className="h-100 custom-card-5 dark-theme-custom-card-5">
              <Card.Body>
                <Card.Title>Instagram Bio</Card.Title>
                <Card.Text className="">
                  Write a creative personal bio that captures attention.
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Personal Information</label>
                    <div className="input-affix">
                      <input
                        type="text"
                        onChange={(e) => setPrompt(e.target.value)}
                        className="form-control"
                        id="userName"
                        placeholder="Travel to India"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Language</label>
                    <div className="input-affix m-b-10">
                      <i className="prefix-icon anticon anticon-lock"></i>
                      <SelectLanguage setLanguage={setLanguage} language={language} />
                    </div>
                  </div>
                  <div className="form-group">
                    <Button onClick={(e) => handleSubmit(e)} form="form" type='submit' color='primary' className="d-flex gap-1 flex-nowrap mt-1" style={{ padding: "15px 30px", borderRadius: "20px", }}>
                      <span>{postSuggestionLoading !== 'idle' ? "Generating" : 'Generate'}</span>
                      {postSuggestionLoading !== 'idle' ?
                        <Spinner style={{
                          height: '1rem',
                          width: '1rem'
                        }}
                        />
                        : null}
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </div>
          </Col>
          <Col lg="6">
            <div className="h-100 custom-card-5 dark-theme-custom-card-5">
              <Card.Body>
                <Card.Title className="text-center font-weight-bold text-uppercase">
                  Output
                </Card.Title>
                <div className="text-center">
                  <div>
                    <BsSaveFill
                      style={{ cursor: "pointer" }}
                      onClick={(e) => saveDocument(e)}
                    />
                  </div>
                </div>
              </Card.Body>
              <div className="">
                {postSuggestionLoading !== 'idle' ? (
                  <CardBody className="py-4 col-12 d-flex h-100 justify-content-center align-items-center align-content-center">
                    {/* <Loader />{" "} */}
                    <ComponentSpinner />
                  </CardBody>
                ) : (
                  <Card.Body>
                    <Card.Title className="text-uppercase"></Card.Title>
                    <Card.Text>
                      <div dangerouslySetInnerHTML={{ __html: data }} />
                    </Card.Text>
                  </Card.Body>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container >
  );
};

export default IB;
