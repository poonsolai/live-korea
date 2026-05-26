import React, { useEffect, useState } from "react";
import "./css/EmergencyPage.css";
import hospitalimg from "../assets/hospital.jpg";
import { Link } from "react-router-dom";
import API from "../api";

// ✅ FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faVolumeUp,
  faStar,
  faChevronLeft,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const emergencyData = [
  { number: "119", label: "Fire & Ambulance", color: "danger" },
  { number: "112", label: "Police", color: "primary" },
  { number: "1330", label: "Tourist Helpline", color: "success" },
  { number: "129", label: "Health Helpline", color: "secondary" },
];

const EmergencyPage = () => {
  //state variable for phrases
  const [phrases, setPhrases] = useState([]);
  const [num, setNum] = useState(5);
  // get datas in database 
  const fetchEmpPhrases = async ()=>{
    const res = await axios.get(`${API}/api/emp`);
    setPhrases(res.data.empphrases);

  }
  // first time load
  useEffect(() => {
    window.speechSynthesis.getVoices();
    fetchEmpPhrases();
  }, []);
  //call handle function
  const handleCall = (num) => {
    window.location.href = `tel:${num}`;
  };
  //speadk function
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ko-KR";
    speech.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };
  //header style
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
      rgba(255, 255, 255, 0.85) 0%, 
      rgba(255, 255, 255, 0.4) 50%, 
      rgba(255, 255, 255, 0) 90%), url(${hospitalimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <header className="hero-section" style={headerStyle}>
        <div className="hero-gradient-overlay"></div>
        <div className="container-fulid p-4 position-relative ">
          <div className=" row">
            <div className="col-8 col-sm-10 col-lg-12 ">
              <h1 className="hero-title fw-bold"> Emergency 🚨 </h1>
              <p className="hero-desc">
                Important contacts, phrases, and tips to help you in an
                emergency situation in Korea.
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
      
      <div className="px-3 mt-5">
        {/* Quick Call */}
        <div className="card p-3 mt-2 mb-3 shadow-sm d-flex flex-row justify-content-between align-items-center ">
          <div>
            <h6 className="mb-1">In an emergency?</h6>
            <small className="text-muted">
              Call the numbers below immediately.
            </small>
          </div>
          <button className="btn btn-danger" onClick={() => handleCall("119")}>
            Call Now
          </button>
        </div>

        {/* Emergency Numbers */}
        <h5 className="mb-2">Emergency Numbers</h5>
        <div className="row">
          {emergencyData.map((item, index) => (
            <div className="col-6 col-md-3 mb-3" key={index}>
              <div className="card text-center p-3 shadow-sm h-100">
                <h4 className={`text-${item.color} fw-bold`}>{item.number}</h4>
                <p className="small text-muted">{item.label}</p>
                <button
                  className={`btn btn-${item.color} btn-sm`}
                  onClick={() => handleCall(item.number)}
                >
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Useful Phrases */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5>Useful Phrases</h5>
          {
            num == 5 ? <span className="text-danger small " style={{cursor:"pointer"}} onClick={()=>setNum(phrases.length)}>View All <FontAwesomeIcon icon={faArrowRight}/></span> :
            <span className="text-primary small" style={{cursor:"pointer"}}   onClick={()=>setNum(5)}>Hide <FontAwesomeIcon icon={faArrowLeft}/></span>
          }
        </div>

        {phrases.slice(0,num).map((p, i) => (
          <div
            key={i}
            className="card p-3 mb-2 shadow-sm d-flex flex-row align-items-center"
          >
            {/* 👤 Icon */}
            <div className="icon-box">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="ms-3 flex-grow-1">
              <strong>{p.korean}</strong>
              <p className="mb-0 small text-muted">{p.romanized}</p>
              <p>{p.english}</p>
            </div>

            {/* 🔊 SOUND BUTTON */}
            <button
              className="btn btn-danger me-2"
              onClick={() => speak(p.korean)}
            >
              <FontAwesomeIcon icon={faVolumeUp} />
            </button>

            {/* ⭐ STAR */}
            <FontAwesomeIcon icon={faStar} className="text-muted" />
          </div>
        ))}

        {/* Tips */}
        <div className="card p-3 mt-3 shadow-sm">
          <h6>Emergency Tips</h6>
          <ul className="small mb-0">
            <li>Stay calm and explain your situation clearly.</li>
            <li>Use simple Korean phrases.</li>
            <li>Share your location if possible.</li>
            <li>Keep emergency numbers saved.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
