// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// ** Custom Components
import Avatar from "@components/avatar";
import { saveAs } from "file-saver";

// ** Third Party Components
// import DataTable from "react-data-table-component";  
import {
  Send,
  Info,
  Save,
  PieChart,
  CheckCircle,
  ArrowDownCircle,
} from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Nav,
  NavLink,
  CardText,
  TabContent,
  TabPane,
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";
// import EditSvg from "./svg/EditSvg"

// ** Avatar Images
// import avatar1 from "@src/assets/images/avatars/1-small.png";
// import avatar9 from "@src/assets/images/avatars/9-small.png";
// import avatar10 from "@src/assets/images/avatars/10-small.png";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useDispatch, useSelector } from "react-redux";
import { billingHistory, creditHistory } from "../../redux/actions/billingAction";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";
import PaginationWrapper from "./Pagination";
import DownloadSvg from "./svg/DownloadSvg";
import moment from "moment/moment";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

const BillingHistory = () => {
  const [activeTab, setActiveTab] = useState('')
  const dispatch = useDispatch()
  const { skin, setSkin } = useSkin();
  const [billPage, setBillPage] = useState(1)
  const [creditPage, setCreditPage] = useState(1)
  const [billingTotalPages, setBillingTotalPages] = useState(null)
  const [creditTotalPages, setCreditTotalPages] = useState(null)
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;
  const { billHis, billHisLoading, billHisError } = useSelector(state => state.billing)
  const { creditHis, creditHisLoading, creditHisError } = useSelector(state => state.billing)

  useEffect(() => {
    if (billHis && billHis?.data) {
      if (billHis?.data?.billingHistory?.length > 0) {
        setActiveTab('tab1')
      }
      setBillingTotalPages(Math.ceil(billHis?.data?.billingTotal / 5))
    }
  }, [billHis])

  useEffect(() => {
    if (creditHis && creditHis?.data && !billHis?.data?.billingHis) {
      if (creditHis?.data?.creditTotal > 0) {
        setActiveTab('tab2')
      }
      setCreditTotalPages(Math.ceil(creditHis?.data?.creditTotal / 5))
    }
  }, [creditHis])


  useEffect(() => {
    let body = {
      page: billPage,
      perPageItem: 5
    }
    dispatch(billingHistory(body))
  }, [])

  useEffect(() => {
    let body = {
      page: creditPage,
      perPageItem: 5
    }
    dispatch(creditHistory(body))
  }, [])

  const handleDownload = (el) => {
    saveAs(el.invoicePDF, 'downloaded.pdf');
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      {creditHis?.data?.creditHistory?.length || billHis?.data?.billingHistory?.length ? (
        <div className="invoice-list-wrapper" >
          <Card className="custom-card-5 dark-theme-custom-card-5 h-100 w-100" style={{ boxShadow: "none", backgroundColor: "transparent!important" }}>
            <CardHeader className="py-1">
              <CardTitle tag="h4" style={{ color: `${theming}` }}>
                History
              </CardTitle>
            </CardHeader>
            <div className="custom-card-1 dark-custom-card-1">
              <Nav tabs className="navlink-1 dark-navlink-1">
                <div className="navlink-buttons d-flex text-right gap-1">
                  {billHis?.data?.billingHistory.length > 0 ? (
                    <NavLink
                      onClick={() => toggleTab('tab1')}
                      to="/view-billing-history"
                      className={activeTab === 'tab1' ? "custom-button-active" : "custom-button-not-active"}
                    >
                      <CardText>Billing History</CardText>
                    </NavLink>
                  ) : null}
                  {creditHis?.data?.creditHistory.length > 0 ? (
                    <NavLink
                      onClick={() => toggleTab('tab2')}
                      to="/view-credit-history"
                      className={activeTab === 'tab2' ? "custom-button-active" : "custom-button-not-active"}
                    >
                      <CardText>Credit History</CardText>
                    </NavLink>
                  ) : null}
                </div>
              </Nav>
              <TabContent activeTab={activeTab}>
                {billHis?.data?.billingHistory.length > 0 ? (
                  <TabPane tabId="tab1">
                    <div className="billing-container dark-billing-container">
                      <div className="scroll-bar dark-scroll-bar">
                        {billHisLoading === 'idle' ? (
                          <div className="custom-billing dark-custom-billing">
                            <div className="custom-billing-head dark-custom-billing-head">
                              <div className="d-flex justify-content-end align-content-end mb-2">
                                {/* <div className="w-25 theme-button dark-theme-button position-relative">
                        <Input
                          className="form-control"
                          type="text"
                          name="docSearch"
                          id="docSearch"
                          placeholder="Search document"
                          autoFocus={true}
                        />
                        <div className="position-absolute" style={{ top: "25px", left: "10px", zIndex: "100" }}>
                          <Search />
                        </div>
    
                      </div> */}
                              </div>
                              <div className="custom-billing-row dark-custom-billing-row">
                                <div className="custom-billing-header">
                                  #
                                </div>
                                <div className="custom-billing-header">
                                  Total
                                </div>
                                <div className="custom-billing-header">
                                  Issue Date
                                </div>
                                <div className="custom-billing-header">
                                  Due Date
                                </div>
                                <div className="custom-billing-header">
                                  Status
                                </div>
                                <div className="custom-billing-header">
                                  Action
                                </div>
                              </div>
                            </div>
                            <div className="custom-billing-container dark-custom-billing-container">
                              {billHis?.data
                                ? billHis.data?.billingHistory.map((el) => {
                                  return (
                                    <div key={uuidv4()} className="custom-billing-body dark-custom-billing-body">
                                      <div className="custom-billing-row dark-custom-billing-row">
                                        <div className="custom-billing-header">{el.index}</div>
                                        <div className="custom-billing-header">${el.total}</div>
                                        <div className="custom-billing-header">{moment(el.issuedDate).format("DD-MM-YYYY")}</div>
                                        <div className="custom-billing-header">{moment(el.dueDate).format("DD-MM-YYYY")}</div>
                                        <div style={{ fontWeight: 600, fontSize: "15px" }} className="custom-billing-header text-capitalize"><span style={{ backgroundColor: "rgb(0, 240, 0,0.5)", padding: "5px 10px", borderRadius: "15px" }}>{el.status}</span></div>
                                        <div className="custom-billing-header" onClick={() => handleDownload(el)}><DownloadSvg /></div>
                                      </div>
                                    </div>
                                  );
                                })
                                : null}
                            </div>
                            {billHis.data?.billingHistory.length !== 0 && (
                              <PaginationWrapper
                                page={billPage}
                                totalPages={billingTotalPages}
                                setPage={setBillPage}
                              />
                            )}
                          </div>
                        ) : (
                          <div className="text-center h1 d-flex justify-content-center align-content-center h-100 w-100">
                            <ComponentSpinner style={{ width: "2rem", height: "2rem" }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </TabPane>
                ) : null}
                {creditHis?.data?.creditHistory.length > 0 ? (
                  <TabPane tabId="tab2">
                    <div className="w-100">
                      <div className="credit-container dark-credit-container">
                        <div className="scroll-bar dark-scroll-bar">
                          {creditHisLoading === 'idle' ? (
                            <div className="custom-credit dark-custom-credit">
                              <div className="custom-credit-head dark-custom-credit-head">
                                <div className="d-flex justify-content-end align-content-end mb-2">
                                  {/* <div className="w-25 theme-button dark-theme-button position-relative">
                        <Input
                          className="form-control"
                          type="text"
                          name="docSearch"
                          id="docSearch"
                          placeholder="Search document"
                          autoFocus={true}
                        />
                        <div className="position-absolute" style={{ top: "25px", left: "10px", zIndex: "100" }}>
                          <Search />
                        </div>
    
                      </div> */}
                                </div>
                                <div className="custom-credit-row dark-custom-credit-row">
                                  <div className="custom-credit-header">
                                    Transaction
                                  </div>
                                  <div className="custom-credit-header">
                                    Credits
                                  </div>
                                  <div className="custom-credit-header">
                                    Date
                                  </div>
                                  {/* <div className="custom-credit-header">
                              More
                            </div> */}
                                </div>
                              </div>
                              <div className="custom-credit-container dark-custom-credit-container">
                                {creditHis?.data
                                  ? creditHis?.data?.creditHistory.map((el) => {
                                    return (
                                      <div key={uuidv4()} className="custom-credit-body dark-custom-credit-body">
                                        <div className="custom-credit-row dark-custom-credit-row">
                                          <div className="custom-credit-header">{el.plan}</div>
                                          {el.credits === 0 ? (
                                            <div style={{ fontWeight: 600, fontSize: "15px" }} className="custom-billing-header text-capitalize"><span style={{ backgroundColor: "rgb(255,0,0,0.5)", padding: "5px 10px", borderRadius: "15px" }}>Cancelled</span></div>
                                          ) : (
                                            <div className="custom-credit-header">{el.credits}</div>
                                          )}
                                          <div className="custom-credit-header">{moment(el.date).format("DD-MM-YYYY, h:mm A")}</div>
                                          {/* <div className="custom-credit-header" onClick={() => handleDownload(el)}><DownloadSvg /></div> */}
                                        </div>
                                      </div>
                                    );
                                  })
                                  : null}
                              </div>
                              {creditHis?.data?.creditHistory.length !== 0 && (
                                <PaginationWrapper
                                  page={creditPage}
                                  totalPages={creditTotalPages}
                                  setPage={setCreditPage}
                                />
                              )}
                            </div>
                          ) : (
                            <div className="text-center h1 d-flex justify-content-center align-content-center h-100 w-100">
                              <ComponentSpinner style={{ width: "2rem", height: "2rem" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabPane>
                ) : null}
              </TabContent>
            </div>
          </Card >
        </div >
      ) : null}
    </>
  );

};

export default BillingHistory;
