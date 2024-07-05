import React from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import useState from "react-usestateref";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsSaveFill } from "react-icons/bs";
import { Breadcrumb, BreadcrumbItem, CardBody, Spinner } from "reactstrap";
import { CreationHubApi } from "../../../helpers/api/creactionHub";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";
import { SelectLanguage } from "../SelectLanguage";
import { postSuggestions } from "../../../redux/actions/suggestionAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { emptyPostSuggestion } from "../../../redux/slices/suggestionSlice";
import { subscriptionActions } from "../../../redux/subscription";
import { ReactToast } from "../../../@core/components/react-toast/ReactToast";

const Any = () => {
  const dispatch = useDispatch()
  const [prompt, setPrompt, promptRef] = useState("");
  const [prompt1, setPrompt1, prompt1Ref] = useState("");
  const [prompt2, setPrompt2, prompt2Ref] = useState("");
  const [prompt3, setPrompt3, prompt3Ref] = useState("");
  const [prompt4, setPrompt4, prompt4Ref] = useState("");

  const [language, setLanguage, languageRef] = useState("English");
  const [data, setData] = useState();

  const [docId, setDocId, docIdRef] = useState();
  const [show, setShow] = useState(false);
  const [msg, setMsg, msgRef] = useState("");

  const [documentloding, setdocumentloding] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { postSuggestion, postSuggestionLoading, postSuggestionError } = useSelector(state => state.suggestion)
  const { subscription_plans_modal } = useSelector((state) => state.subscription)

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
      prompt2: `${prompt1Ref.current}`,
      prompt3: `${prompt2Ref.current}`,
      prompt4: `${prompt3Ref.current}`,
      prompt5: `${prompt4Ref.current}`,
      language: `${languageRef.current}`,
      type: "any_commands",
    };
    dispatch(postSuggestions(postData))
  }

  async function saveDocument(e) {
    e.preventDefault();
    setdocumentloding(true);
    if (docIdRef.current) {
      const id = docIdRef.current;

      const res = await CreationHubApi.saveDocumentCreation(id);

      if (res.success) {
        setdocumentloding(false);
        setMsg("Document Saved Successfully");
        handleShow();
      } else {
        setdocumentloding(false);
        setMsg("First generate content then you can save");
        handleShow();
      }
    } else {
      setdocumentloding(false);
      setMsg("First generate content then you can save");
      handleShow();
    }
  }

  return (
    <div>
      <div className="pb-3">
        <Breadcrumb className="ms-1">
          <BreadcrumbItem>
            <Link to="/creationhub">Creation Hub</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <Link to="/command">
              <span active>Commands</span>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{msgRef.current}</Modal.Body>
      </Modal>
      <div className="spinner"></div>

      <Container className="">
        <Row className="h-100 customcard">
          <Col lg="6" className="h-100">
            <div className="h-100 ">
              <div className="borderbottom">
                <Card.Body>
                  <Card.Title>Any Commands</Card.Title>
                  <Card.Text>Endless possibility. </Card.Text>
                </Card.Body>
              </div>
              <Card.Body>
                <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Industry</label>
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
                    <label>Create a</label>
                    <div className="input-affix">
                      <input
                        type="text"
                        onChange={(e) => setPrompt1(e.target.value)}
                        className="form-control"
                        id="userName"
                        placeholder="Travel to India"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>About</label>
                    <div className="input-affix">
                      <input
                        type="text"
                        onChange={(e) => setPrompt2(e.target.value)}
                        className="form-control"
                        id="userName"
                        placeholder="Travel to India"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>In order to</label>
                    <div className="input-affix">
                      <input
                        type="text"
                        onChange={(e) => setPrompt3(e.target.value)}
                        className="form-control"
                        id="userName"
                        placeholder="Travel to India"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>How much long</label>
                    <div className="input-affix">
                      <input
                        type="text"
                        onChange={(e) => setPrompt4(e.target.value)}
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
            <div className="h-100">
              <div className="borderbottom">
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
              </div>

              <div className=" h-100">
                {documentloding ? (
                  <CardBody className="py-4 col-12">
                    <Loader />{" "}
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
      </Container>
    </div>
  );
};

export default Any;
