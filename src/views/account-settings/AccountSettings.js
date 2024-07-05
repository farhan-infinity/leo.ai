// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, CardHeader } from "reactstrap";

// ** Demo Components
import Tabs from "./Tabs";
import Breadcrumbs from "@components/breadcrumbs";
import BillingTabContent from "./BillingTabContent";
import AccountTabContent from "./AccountTabContent";
import SecurityTabContent from "./SecurityTabContent";
// import ConnectionsTabContent from './ConnectionsTabContent'
import NotificationsTabContent from './NotificationsTabContent'

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { Affliate } from "./Affliate";
import SettingSvg from "./SettingSvg";

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState({
    general: {
      avatar: "",
      username: "johndoe",
      fullName: "John Doe",
      email: "granger007@hogward.com",
      company: "PIXINVENT",
    },
    info: {
      bio: "",
      dob: null,
      country: "USA",
      website: "",
      phone: 6562542568,
    },
    social: {
      socialLinks: {
        twitter: "https://www.twitter.com",
        facebook: "",
        google: "",
        linkedIn: "https://www.linkedin.com",
        instagram: "",
        quora: "",
      },
      connections: {
        twitter: {
          profileImg: "",
          id: "johndoe",
        },
        google: {
          profileImg: "",
          id: "luraweber",
        },
        facebook: {},
        github: {},
      },
    },
    notification: {
      commentOnArticle: true,
      answerOnForm: true,
      followMe: false,
      newAnnouncements: true,
      productUpdates: true,
      blogDigest: false,
    },
  });

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   axios
  //     .get("/account-setting/data")
  //     .then((response) => setData(response.data));
  // }, []);

  return (
    <Fragment>
      <div className='parent-card-2 dark-theme-parent-card-2'>
        <div className="breadCrumb-custom dark-breadCrumb-custom">
          <SettingSvg />
          <Breadcrumbs title='Settings' data={[{ title: 'Account Settings' }]} />
        </div>
        {data !== null ? (
          <Col className=" mb-0 mt-0 w-100 overflow-auto scrollbar">
            <Col className="p-2 mt-2" xs={12}>
              <Tabs
                className="mb-2 "
                activeTab={activeTab}
                toggleTab={toggleTab}
              />
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <AccountTabContent data={data.general} />
                </TabPane>
                <TabPane tabId="2">
                  <BillingTabContent />
                </TabPane>
                <TabPane tabId="5">
                  <Affliate />
                </TabPane>
                <TabPane tabId="3">
                  <SecurityTabContent />
                </TabPane>
                {/* <TabPane tabId='4'>
                  <NotificationsTabContent />
                </TabPane> */}
                {/* <TabPane tabId='5'>
                  <ConnectionsTabContent />
                </TabPane> */}
              </TabContent>
            </Col>
          </Col>

        ) : null}
      </div>
    </Fragment>
  );
};

export default AccountSettings;
