import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/LifeTips.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import image from "../assets/homepage-image/korea10.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import NewCategoryBar from "../components/NewCatagoryBar";
import API from "../api.js";
const LifeTips = () => {
  const [tipsData, setTipsData] = useState([]);
  const [tipsDataF, setTipsDataF] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState([]);
  const [show, setShow] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  async function fetchTips() {
    const res = await axios.get(`${API}/tips`);
    setTipsData(res.data.tips);
    setTipsDataF(res.data.tips);
  }
  // Load saved tips
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedTips")) || [];
    setSaved(stored);
    fetchTips(); //call first time
  }, []);

  // store a fav parses
  const toggleSave = async (item) => {
    const res = await axios.patch(`${API}/save`, {
      id: item._id,
    });
    fetchTips();
  };

  // Filter logic
  const filteredTips = tipsData.filter((tip) => {
    return (
      (category === "All" || tip.category === category) &&
      tip.title.toLowerCase().includes(search.toLowerCase())
    );
  });
  // header background style with gradient overlay and tourist image
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
          rgba(255, 255, 255, 0.85) 0%, 
          rgba(255, 255, 255, 0.4) 50%, 
          rgba(255, 255, 255, 0) 90%), url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
  };
  
  return (
    <div className=" container-fluid px-3">
      {/* Hero Section */}
      <header className="hero-section mb-4" style={headerStyle} id="b">
        <div className="hero-gradient-overlay"></div>
        <div className="container-fulid p-4 position-relative ">
          <div className=" row">
            <div className="col-8 col-sm-10 col-lg-12 ">
              <h1 className="hero-title fw-bold">
                Life <span style={{ color: "#6c63ff" }}>Tips</span>
              </h1>
              <p className="hero-desc">
                Cultural tips, rules and dos & don'ts to help you live
                comfortably in Korea.
              </p>
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

      {/* SEARCH */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tips..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {show ? (
          <button
            className="btn btn-light"
            onClick={() => {
              setTipsData(tipsData.filter((i) => i.saved == true));
              setShow(false);
            }}
          >
            <i className="fa-solid fa-bookmark"></i> Saved
          </button>
        ) : (
          <button
            className="btn  bg-blue"
            onClick={() => {
              setTipsData(tipsDataF);
              setShow(true);
            }}
          >
            <i className="fa-solid fa-bookmark"></i> Saved
          </button>
        )}
      </div>

      {/* CATEGORY FILTER */}
      <NewCategoryBar val={[
          "All",
          "Culture",
          "Transport",
          "Money",
          "Communication",
          "Safety",
        ]} setCategory={setCategory} active={category}/>
      


      {/* LIST */}
      <h5 className="mt-4">Popular Tips</h5>

      {filteredTips.map((tip, index) => (
        <div key={index}>
          <div className="tip-item" onClick={() => toggleDetails(index)}>
            <div>
              <h6>{tip.title}</h6>
              <p>{tip.description}</p>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-light text-dark">{tip.category}</span>

              <i
                className={`fa-bookmark ${
                  tip.saved ? "fa-solid saved" : "fa-regular"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(tip);
                }}
              ></i>

              <i
                className={`fa-solid fa-chevron-right dropdown-arrow ${
                  openIndex === index ? "rotate-arrow" : ""
                }`}
              ></i>
            </div>
          </div>

          <div
            className={`tip-dropdown ${
              openIndex === index ? "show-dropdown" : ""
            }`}
          >
            <p>{tip.details}</p>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default LifeTips;
