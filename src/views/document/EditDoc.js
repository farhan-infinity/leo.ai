import React, { useEffect } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import useState from "react-usestateref";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSaveFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Domain } from "../../utility/Domain";
import BreadCrumbs from '../../@core/components/breadcrumbs'
import DocumentSvg from "./svg/documentSvg";
import DownloadSvg from "./svg/DownloadSvg";
import DeleteSvg from "./svg/DeleteSvg";
import toast from "react-hot-toast";
import DangerIcon from "../../@core/assets/svg/dangerSvg"
import CloseIcon from "../../@core/assets/svg/cancelSvg"
import { useDispatch } from "react-redux";
import WarningModal from "../../common/WarningModal";
import { Button } from "reactstrap";
import { ReactToast } from "../../@core/components/react-toast/ReactToast";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";

const EditDoc = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const [data, setData, dataRef] = useState();

  const [updatedData, setUpdatedData, UpdatedDataRef] = useState();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [msg, setMsg, msgRef] = useState("");
  const [modal, setModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggle = () => setModal(!modal);
  const modalTextHeader = "Are you sure want to delete this document?"

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoader(true)
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      let response = await axios.get(`${Domain}/document/${location.state.id}`, axiosConfig)
      setData(response.data.document);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      if (error.response.data.message) {
        toast((t) => (
          <div className='toast-body'>
            <div>
              <DangerIcon />
              {/* <SuccessIcon /> */}
            </div>
            <div className='toast-message'>
              {(error.response.data.message)}
            </div>
            <div className='toast-button-container'>
              <button className='toast-button' onClick={() => toast.dismiss(t.id)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        ));
      } else {
        setLoader(false)
        console.log(error.message);
      }
    }
  }

  const onGetData = (data) => {
    setUpdatedData(data);
  };

  const copyToClipboard = (data) => {
    const tempElement = document.createElement('textarea');
    tempElement.value = data;
    document.body.appendChild(tempElement);

    // Select and copy the data
    tempElement.select();
    document.execCommand('copy');

    // Remove the temporary element
    document.body.removeChild(tempElement);
    let error = false
    let newMessage = "Text is copied to clipboard"
    ReactToast({ message: newMessage, error })
  };

  return (
    <div>
      {/* <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Body>{msgRef.current}</Modal.Body>
      </Modal> */}
      <WarningModal toggle={toggle} setModal={setModal} modal={modal} id={location.state.id} modalTextHeader={modalTextHeader} />
      <Container className="parent-card-2 dark-theme-parent-card-2">
        <div className="breadCrumb-custom dark-breadCrumb-custom">
          <DocumentSvg />
          <BreadCrumbs title="View Document" data={[{ title: "Document", link: "/document" }, { title: "View Document", link: "/edit_document" }]} />
        </div>
        <div className="inner-parent-child">
          {loader === true ? (
            <ComponentSpinner style={{ height: "2rem", width: "2rem" }} />
          ) : (
            <Row lg={12}>
              <Col className="h-100">
                <div className="h-100 custom-card-5 dark-theme-custom-card-5">
                  <Card.Body>
                    <div className="form-group">
                      <div className="">
                        {dataRef.current ? (
                          <p
                            onChange={(e) => onGetData(e.target.value)}
                            rows="12"
                            className="w-100 h-100 p-3"
                          >
                            {dataRef.current.response}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Card.Body>
                </div>
                <div className="d-flex mt-3">
                  <div onClick={() => copyToClipboard(dataRef.current.response)} className="cursor-pointer">
                    <DownloadSvg
                      style={{ fontSize: "1.5rem" }}

                    />
                  </div>
                  <div onClick={() => toggle()} className="cursor-pointer">
                    <DeleteSvg
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>

      </Container>
    </div>
  );
};

export default EditDoc;
