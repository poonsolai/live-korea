import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/CheckList.css";
//import icons
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
  faArrowLeft,
  faPlane,
  faSuitcase,
  faLocationDot,
  faClipboardCheck,
  faHouse,
  faLanguage,
  faLightbulb,
  faPassport,
  faShieldHalved,
  faWallet,
  faMobileScreen,
  faShirt,
  faPlug,
  faFileLines,
  faBottleWater,
  faHeart,
  faCheck,
  faChevronLeft,
  faPlaneDeparture,
  faHotel,
  faCapsules,
  faPumpSoap,
  faBatteryFull,
  faStamp,
  faSimCard,
  faMoneyBill,
  faKey,
  faTrain,
  faDownload,
  faChartLine,
  faCamera,
  faCreditCard,
  faCloudArrowUp,
  faUtensils,
  faPhone,
  faHospital,
  faFolder,
  faGift,
  faDoorOpen,
  faCar,

  // NEW ICONS
  faFile,
  faShield,
  faBagShopping,
  faBed,
  faUmbrella,
  faUserTie,
  faPersonBooth,
  faSocks,
  faShoePrints,
  faTooth,
  faSoap,
  faBath,
  faFaceSmile,
  faChargingStation,
  faHeadphones,
  faBriefcaseMedical,
  faMaskFace,
  faCookieBite,
  faBowlFood,
  faMitten,
  faHatCowboy,
  faPersonSnowboarding,
  faMoneyBillWave,
  faCableCar,
  faMapLocationDot,
  faPhoneVolume,
  faWifi,
  faPumpMedical,
  faHandsBubbles,
  faKitMedical,
} from "@fortawesome/free-solid-svg-icons";
//map icons
import * as iconMap from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import travel from "../assets/travel.jpg";
//import component
import QuickTips from "../components/QuickTips";
import CatagoryBar from "../components/NewCatagoryBar";
import API from "../api"; 

const CheckList = () => {
  const [activeTab, setActiveTab] = useState("Before You Go");

  const [checklist, setChecklist] = useState([]);
  const [view, setView] = useState(5);

  async function fetchData() {
    let res = await axios.get(`${API}/checklist`);
    setChecklist(res.data.checklist);
  }
  // call one time
  useEffect(() => {
    fetchData();
  }, []);

  const categories = [
    {
      title: "Essentials",
      icon: faSuitcase,
      color: "green",
    },
    {
      title: "Clothing",
      icon: faShirt,
      color: "blue",
    },
    {
      title: "Toiletries",
      icon: faBottleWater,
      color: "orange",
    },
    {
      title: "Electronics",
      icon: faPlug,
      color: "purple",
    },
    {
      title: "Documents",
      icon: faFileLines,
      color: "pink",
    },
  ];

  const packItems = categories.map((category) => {
    const items = checklist.filter(
      (item) => item.subCategory === category.title,
    );

    const packedCount = items.filter((item) => item.checked).length;

    const totalCount = items.length;

    const progressWidth =
      totalCount > 0 ? `${(packedCount / totalCount) * 100}%` : "0%";

    return {
      ...category,
      progress: `${packedCount} / ${totalCount}`,
      width: progressWidth,
    };
  });

  const savedItems = checklist.filter((i) => i.saved);

  const toggleCheck = async (item) => {
    try {
      // COMPLETED CHECK
      if (item.status === "Completed") {
        const confirmReset = window.confirm(
          "Are you sure want to reset this checklist?",
        );

        // NO CLICK
        if (!confirmReset) {
          return;
        }
      }
      const response = await axios.patch(
        `${API}/status/${item._id}`,
      );
      const updatedItem = response.data.item;
      setChecklist((prev) =>
        prev.map((i) => (i._id === item._id ? updatedItem : i)),
      );
    } catch (error) {
      console.log(error);
    }
  };
  // saved
  const toggleSave = async (id) => {
    const response = await axios.patch(`${API}/save/${id}`);
    fetchData();
  };

  // FILTER LOGIC
  const filteredData = checklist.filter((item) => item.category === activeTab);

  const completedCount = checklist.filter((i) => i.checked).length;

  const progress = Math.round((completedCount / checklist.length) * 100);

  // header background style with gradient overlay and tourist image
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
            rgba(255, 255, 255, 0.85) 0%, 
            rgba(255, 255, 255, 0.4) 50%, 
            rgba(255, 255, 255, 0) 90%), url(${travel})`,
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="checklist-page">
      {/* header  */}
      <header className="hero-section mb-4" style={headerStyle} id="b">
        <div className="hero-gradient-overlay"></div>
        <div className="container-fulid p-4 position-relative ">
          <div className="row justify-content-center align-items-center">
            <div className="col-8 col-md-8  ">
              <h1 className="hero-title fw-bold" id="heading">
                Checklist
              </h1>
              <p className="hero-desc">
                Pre-travel checklist to help you prepare better for your trip to
                Korea.
              </p>
            </div>
            <div className="note-card col-4">
              Well planned trip starts here!
            </div>
          </div>
        </div>
      </header>
      <div className="backbtn">
        <Link
          className="d-flex align-items-center back-link text-secondary"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="me-1" />
          <span>Home</span>
        </Link>
      </div>

      {/* TABS */}
      <CatagoryBar
        val={[
          "Before You Go",
          "What To Pack",
          "On Arrival",
          "During Your Stay",
          "Emergency",
          "Return Trip",
        ]}
        setCategory={setActiveTab}
        active={activeTab}
      />
      {/* <div className="tabs-wrapper">
        {[
          "Before You Go",
          "What To Pack",
          "On Arrival",
          "During Your Stay",
          "Emergency",
          "Return Trip",
        ].map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div> */}

      {/* BODY */}
      <div className="row g-4 mt-1">
        {/* LEFT */}
        <div className="col-lg-8">
          {/* PROGRESS */}
          <div className="card-box">
            <div className="progress-top">
              <div
                className="circle-progress"
                style={{
                  background: `conic-gradient(
      #4f46e5 ${progress * 3.6}deg,
      #e5e7eb 0deg
    )`,
                }}
              >
                <div className="circle-inner">
                  <h3>{progress}%</h3>
                  <span>Completed</span>
                </div>
              </div>

              <div className="progress-details">
                <h4>Overall Progress</h4>
                <p>Keep going! You're doing great.</p>

                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="progress-info">
                  <div>
                    <h5>6</h5>
                    <span>Categories</span>
                  </div>

                  <div>
                    <h5>{completedCount}</h5>
                    <span>Completed</span>
                  </div>

                  <div>
                    <h5>{checklist.length - completedCount}</h5>
                    <span>Remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHECKLIST */}
          <div className="card-box mt-4">
            <div className="section-title">
              <h4>{activeTab}</h4>
              <span>
                {
                  checklist.filter(
                    (item) => item.category === activeTab && item.checked,
                  ).length
                }
                /
                {activeTab === "All Checklist"
                  ? checklist.length
                  : checklist.filter((item) => item.category === activeTab)
                      .length}
              </span>
            </div>

            {filteredData.map((item) => (
              <div className="check-item" key={item._id}>
                <div
                  className={`check-circle ${item.checked ? "checked" : ""} ${item.status == "Process" ? "proc" : ""}`}
                  onClick={() => toggleCheck(item)}
                >
                  {item.checked && <FontAwesomeIcon icon={faCheck} />}
                  {item.status == "Process" ? "P" : ""}
                </div>

                <div className="check-icon">
                  <FontAwesomeIcon icon={iconMap[item.icon]} />
                </div>
                <div className="check-content">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>

                <div
                  className={`status-badge  ${item.status
                    .replace(" ", "")
                    .toLowerCase()}`}
                >
                  {item.status}
                </div>
                <div className="right-section">
                  <button
                    className="save-btn"
                    onClick={() => toggleSave(item._id)}
                  >
                    <FontAwesomeIcon
                      icon={item.saved ? solidHeart : regularHeart}
                      style={{ color: item.saved ? "red" : "#999" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PACK */}
          <div className="mt-4">
            <div className="section-title">
              <h4>What to Pack</h4>
              <span>5/20</span>
            </div>

            <div className="row g-3">
              {packItems.map((item, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={index}>
                  <div className="pack-card">
                    <FontAwesomeIcon icon={item.icon} className="pack-icon" />

                    <h6>{item.title}</h6>

                    <p>{item.progress}</p>

                    <div className="mini-progress">
                      <div
                        className="mini-progress-fill"
                        style={{
                          width: item.width,
                          background: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          {/* TIPS */}
          <QuickTips />

          {/* SAVED */}
          <div className="card-box mt-4">
            <div className="saved-head">
              <h5>
                <FontAwesomeIcon icon={faHeart} /> My Saved Items
              </h5>

              <span>{savedItems.length}</span>
            </div>

            {savedItems.slice(0, view).map((item, index) => (
              <div className="saved-item" key={index}>
                <FontAwesomeIcon icon={iconMap[item.icon]} className="im" />
                <div>
                  <h6>{item.title}</h6>
                  <p>{item.category}</p>
                </div>
              </div>
            ))}
            {}
            {savedItems.length == 0 ? (
              <button className="view-btn"> Is Empty </button>
            ) : savedItems.length <= 5 ? (
              ""
            ) : (
              <button
                className="view-btn"
                onClick={() => {
                  if (view == 5) {
                    setView(savedItems.length);
                  } else {
                    setView(5);
                  }
                }}
              >
                {" "}
                {view <= 5 ? "View all saved" : "Hide all saved"}{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
