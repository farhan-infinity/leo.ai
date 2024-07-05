import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,

  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";
import Chart from "react-apexcharts";
import robotGif from "/img/Robot assistant.gif";

import "@styles/react/pages/home/home.scss";
import moment from "moment";
import { LocalStorageHelpers } from "../helpers/localStoraga";
import "../views/CreateVideo/style.scss";
import BreadCrumbs from "../@core/components/breadcrumbs";
import DashboardSvg from "./DashboardSvg";
import FreeCreditSvg from "./svg/FreeCreditSvg";
import OffForLiveSvg from "./svg/OffForLiveSvg";
import FreeForLifeSvg from "./svg/FreeForLifeSvg";
import { useDispatch, useSelector } from "react-redux";
import { dashboard } from "../redux/actions/dashboardAction";
import { Link } from "react-router-dom";
import { getUserData } from "../utility/Utils";
import { subscriptionActions } from "../redux/subscription";


const HomeComponent = () => {
  const dispatch = useDispatch()
  const [chart, setChart] = useState([]);
  const [maxNumber, setMaxNumber] = useState(24);
  const [ticketNumber, setTicketNumber] = useState(10)
  const userData = LocalStorageHelpers.getUserData();
  const { stats, statsLoading, statsError } = useSelector(state => state.dashboard)
  const { subscription_plans_modal } = useSelector((state) => state.subscription)

  useEffect(() => {
    dispatch(dashboard())
    const userData = getUserData()
    if (userData?.subscriptionStatus === "expired") {
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
  }, [])

  useEffect(() => {
    if (stats) {
      setChart(stats.data2);
      let max = stats?.data2?.textUsage?.length + stats?.data2?.videoUsage?.length
      if (max > 30) {
        let ticketNum = ((max / 2) - 22)
        setTicketNumber(ticketNum)
      }
      setMaxNumber(max)
    }
  })

  const columnColors = {
    series1: "#FE315A",
    series2: "#177FFA",
  };

  // ** Chart Options
  const options = {
    scales: {
      y: {
        beginAtZero: false
      }
    },
    chart: {
      height: 400,
      type: "bar",
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "15%",
        borderRadius: 7,
        dataLabels: {
          maxItems: 100,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "start",
      labels: {
        colors: "gray",
      },
    },
    colors: [columnColors.series2, columnColors.series1],
    backgroundBarRadius: 10,
    stroke: {
      show: true,
      colors: ["transparent"],
    },

    responsive: [
      {
        breakpoint: 3000,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "40%",
              borderRadius: 7,
            },
          },
        },
      },
      {
        breakpoint: 2000,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "40%",
              borderRadius: 7,
            },
          },
        },
      },
      {
        breakpoint: 1440,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
      {
        breakpoint: 560,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
      {
        breakpoint: 483,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "80%",
              borderRadius: 7,
            },
          },
        },
      },
      {
        breakpoint: 375,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "80%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
    grid: {
      show: true,

      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        opacity: 0.5,
      },
      column: {
        opacity: 0.5,
      },
    },

    xaxis: {
      type: "category",
      min: 0,
      max: 10,
      show: true,
      categories: chart?.dates,
      labels: {
        formatter: function (value) {
          return moment(value).format("DD MMM");
        },
        style: {
          colors: "gray",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      show: true,
      labels: {
        labels: {
          formatter: function (value) {
            return value;
          },
        },
        style: {
          colors: "gray",
        },
      },
      min: 0,
      max: maxNumber,
      tickAmount: ticketNumber,
    },
  };

  // ** Chart Series
  const series = [
    {
      name: "Text",
      data: chart?.textUsage,
    },
    {
      name: "Video",
      data: chart?.videoUsage,
    },
  ];

  const progressBarValue = Math.ceil(((stats?.data?.usedCredits / stats?.data?.credits) * 100));

  return (
    <>
      <div className="parent-card-2 dark-theme-parent-card-2 w-100 overflow-hidden " >
        <div className="breadCrumb-custom dark-breadCrumb-custom">
          <DashboardSvg />
          <BreadCrumbs title="Dashboard" data={[]} />
        </div>
        <div className="overflow-auto scrollbar w-100" >
          <div className="component dark-theme-component w-100">
            <Row lg={12} className="row-gap dashboard-row1 w-100 m-0">
              <Col lg={6} md={12} className="dashboard-col1">
                <div className="child-card dark-theme-child-card w-100 h-100">

                  <CardBody
                    className=" bg-primary h-100  d-flex p-1 align-items-center justify-content-between"
                    style={{ borderRadius: "20px" }}
                  >
                    <div className="col-7">
                      <h2 className="text-white">
                        Welcome {userData?.userName} 👋
                      </h2>
                      <p className="text-white font-hauora-regular">
                        Ready to create amazing content with Leo!
                      </p>
                      <div className="mt-3">
                        <p className="text-white font-hauora-regular">
                          Need Some Help to Start ?
                        </p>

                        <button className="btn btn-success font-hauora-regular">
                          Tutorial Hub
                        </button>
                      </div>
                    </div>

                    <div className="mx-2 robot-img-box">
                      <img
                        className="robot-img"
                        src={robotGif}
                        alt="decor-right"
                      />
                    </div>
                  </CardBody>
                </div>
              </Col>
              <Col lg={3} md={12} className="dashboard-col2">
                <div className="child-card dark-theme-child-card w-100 h-100">
                  <div className="h-100 ">
                    <div className="card-bg h-100 d-flex flex-column gap-2  p-1   ">
                      <div
                        className="card-div d-flex flex-row justify-content-between"
                      >
                        <div>
                          <p className="cardTitle fw-bolder">Credits </p>
                        </div>
                        {stats?.data?.usedCredits ? (
                          <div>
                            <p className="text-success">{stats?.data?.credits - stats?.data?.usedCredits}<small>{" "}left</small></p>
                          </div>
                        ) : null}

                      </div>
                      <div className="card-content d-flex justify-content-between">
                        <div className="card-content-1 border-end col-6">
                          <p className="cardSubTitle">Credit used</p>
                          <p className="cardText fw-bolder">
                            {stats?.data?.usedCredits ? stats?.data?.usedCredits : 0}
                          </p>
                        </div>
                        <div className="card-content-2 col-6 pb-1">
                          <p className="cardSubTitle flex-end">Total Credits</p>
                          <p className="cardText flex-end float-end fw-bolder">
                            {stats?.data?.credits ? stats?.data?.credits : 0}
                          </p>
                        </div>
                      </div>
                      <div className=" progress-bar">
                        <span
                          className="progress-chart"
                          style={{ width: `${progressBarValue}px` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={12} className="dashboard-col3">
                <div className="child-card dark-theme-child-card w-100 h-100">
                  <div className="h-100  ">
                    <div className="card-bg h-100 p-1 d-flex flex-column gap-2 ">
                      <div className="card-div flex-row d-flex justify-content-between ">
                        <div>
                          <p className="cardTitle  fw-bolder">Time Saved </p>
                        </div>
                        <div>
                          <p className="text-success"></p>
                        </div>
                      </div>
                      <div
                        className="card-div-2 d-flex align-items-center justify-content-center position-relative"
                        style={{ height: "80%" }}
                      >
                        <div
                          style={{ marginTop: "20px" }}
                          className=" col-6 fw-bolder d-flex flex-column align-items-center text-align-center  justify-content-center position-absolute "
                        >
                          <div className="font-hauora-medium time-font text-div">
                            {stats?.data?.timeSave
                              ? Math.ceil(stats?.data?.timeSave / 60)
                              : 0}
                            +
                          </div>
                          <div
                            className="hour-font font-hauora-medium"
                            style={{
                              fontWeight: "700",
                              fontSize: "17px",
                            }}
                          >
                            hours
                          </div>
                        </div>
                        <div className="clockImg  d-flex  align-items-center justify-content-center">
                          <img
                            style={{ width: "125px", height: "115px" }}
                            src="/img/Ellipse.png"
                            alt="elipse"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={9} md={12} className="dashboard-col4">
                <div className="child-card dark-theme-child-card w-100 h-100">
                  <div>
                    <Card className="mb-0" style={{ borderRadius: "20px" }}>
                      <CardHeader>
                        <p className="cardTitle fw-bolder">Content Created</p>
                      </CardHeader>
                      <CardBody className="p-0">
                        <div className="h-100 d-flex  align-items-center justify-content-center  ">
                          <CardBody className="p-0">
                            <Chart
                              options={options}
                              series={series}
                              type="bar"
                              height={450}
                            />
                          </CardBody>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={12} className="dashboard-col5">
                <div className="child-card dark-theme-child-card w-100 h-100">
                  <div className=" h-100">
                    <Card className="mb-0 p-1 h-100" style={{ borderRadius: "20px" }}>
                      <div

                        style={{
                          paddingBottom: "7px",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        <p className="cardTitle fw-bolder">Invite Your friend and Win Free Commission</p>
                      </div>
                      <Link to="/affiliate">
                        <div style={{ paddingTop: "10px" }} className="card-bg dark-theme-card  d-flex justify-content-center  align-items-center flex-column">
                          <FreeCreditSvg />
                          <p
                            className="font-hauora-medium"
                            style={{
                              margin: "5px",
                            }}
                          >
                            20% commission on
                          </p>
                          <p
                            className="font-hauora-regular"
                            style={{
                              color: "#5A5CD3",
                            }}
                          >
                            First 20 Users
                          </p>
                        </div>
                      </Link>
                      <Link to="/affiliate">
                        <div style={{ paddingTop: "10px" }} className="card-bg dark-theme-card my-2  d-flex justify-content-center  align-items-center flex-column">
                          <OffForLiveSvg />
                          <p
                            className="font-hauora-medium"
                            style={{
                              margin: "5px",
                            }}
                          >
                            30% commission on
                          </p>
                          <p
                            className="font-hauora-regular"
                            style={{
                              color: "#5A5CD3",
                            }}
                          >
                            First 30-50 Users
                          </p>
                        </div>
                      </Link>
                      <Link to="/affiliate">
                        <div
                          style={{
                            background:
                              "linear-gradient(100.5deg, #177FFA -1.26%, #7E7FE3 121.02%)",
                            boxShadow: "0px 4px 18px rgba(75, 70, 92, 0.1)",
                            borderRadius: "20px",
                            paddingTop: "10px"
                          }}
                          className="card-bg d-flex justify-content-center  align-items-center flex-column"
                        >
                          <FreeForLifeSvg />
                          <p
                            className="font-hauora-medium"
                            style={{
                              margin: "5px",
                              color: "white",
                            }}
                          >
                            50% commission on
                          </p>
                          <p
                            className="font-hauora-regular"
                            style={{
                              color: "white",
                            }}
                          >
                            First 50 Users
                          </p>
                        </div>
                      </Link>

                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
