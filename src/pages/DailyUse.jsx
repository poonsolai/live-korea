import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/DailyUse.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import image from "../assets/homepage-image/korea7.jpg";
// import  weather images
import rain from "../assets/weater/rain.png";
import heavyrain from "../assets/weater/heavyrain.jpg";
import sunny from "../assets/weater/sun.png";
import normalcolud from "../assets/weater/normalcloud.png";
import cloudyrain from "../assets/weater/cloudyrain.png";
import cloudy from "../assets/weater/clouds.png";
import snow from "../assets/weater/snow.jpg";
import wind from '../assets/weater/wind.png';
import waterwaves from '../assets/weater/water-waves.png';
// import default weater icon
import defaluticon from "../assets/weater/sunnyweather.png";
//import voltage related image
import td from "../assets/voltage/type_d.jpg";
import tm from "../assets/voltage/type_m.jpg";
import tcf1 from "../assets/voltage/type_c_f_1.jpg";
import tcf from "../assets/voltage/type_c_f.jpg";
import adap from "../assets/voltage/adapter.jpg";
import adap1 from "../assets/voltage/adapter_1.jpg";
// import components
import KoreaTime from "../components/TimeComp.jsx";
import VoltagePlug from "../components/Voltage.jsx";
import TipCalculator from "../components/TipCalculator.jsx";
import SubwayMap from "../components/SubwayMap.jsx";
import Weather from "../components/WeatherComponent.jsx";
// backend api
import API from "../api.js";

const DailyUse = () => {
  //state variable
  const [inr, setInr] = useState(1); 
  const [krw, setKrw] = useState("");
  const [rate, setRate] = useState({ InrToKrw: 0, KrwToInr: 0 });
  const [exchagerate, setExchangerate] = useState(0);
  const APIINR = "https://api.exchangerate-api.com/v4/latest/INR";
  const APIKRW = "https://api.exchangerate-api.com/v4/latest/KRW";
  const [weather, setWeather] = useState(null);
  const [weatericon, setWeatericon] = useState(defaluticon);
  const [current, setCurrent] = useState(true);

  //image maping
  const weatericonimage = {
    "01d": sunny,
    "02d": normalcolud,
    "03d": cloudy,
    "04d": cloudyrain,
    "09d": rain,
    "10d": heavyrain,
    "11d": snow,
  };
  // currency convertor
  const CurrencyConvertor = async () => {
    try {
      let response1 = await axios.get(APIINR);
      let response2 = await axios.get(APIKRW);
      // API rates
      const inrToKrw = response1.data.rates.KRW;
      const krwToInr = response2.data.rates.INR;
      setRate({ InrToKrw: inrToKrw, KrwToInr: krwToInr });
      setExchangerate(response1.data.rates.KRW);  
      setKrw((parseFloat(inr) * response1.data.rates.KRW).toFixed(2)); // default convert ruppe in krw
    } catch (err) {
      console.log(err);
    }
  };
  //call one time 
  useEffect(() => {
    CurrencyConvertor(); // currency convertor function call
    getWeather(); // weather api call
    getCurrentLocation(); // get location
  }, []);

  // currency convert
  function HandleInrChange(e) {
    const { value } = e.target;
    setInr(value);
    if (value == "") {
      setKrw("");
    } else {
      setKrw((parseFloat(value) * exchagerate).toFixed(2));
    }
  }
  function HandleKrwChange(e) {
    const { value } = e.target;
    setKrw(value);
    if (value == "") {
      setInr("");
    } else {
      setInr((parseFloat(value) / exchagerate).toFixed(2));
    }
  }
  //get location
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLat(lat);
        setLon(lon);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // get current weather
  let weatherapikey = "42f5e422f59d8fb1d4b4d6e6750080a0";
  const getWeather = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherapikey}&units=metric`,
    );
    setWeather(res.data);
    let icon = res.data.weather[0].icon;
    setWeatericon(weatericonimage[icon] || defaluticon);
  };

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

    <div className="container-fluid p-3">
      <header className="hero-section " style={headerStyle} id="a">
        <div className="hero-gradient-overlay"></div>
        <div className="container-fulid p-4 position-relative ">
          <div className="col-8 col-sm-10 col-lg-12 row">
            <div className="col">
              <h2 className="fw-bold display-6 banner-title">
                Daily <span>Use</span> ♡
              </h2>
              <p className="hero-desc">
                Useful daily tools to make your life in Korea easier and
                smarter.
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
      {/* QUICK TOOLS */}
      <h6 className="section-title mt-5">Quick Tools</h6>
      <div className="row g-2 mb-4 ">
        {quickTools.map((tool, i) => (
          <a
            className="col-6 col-md-4 col-lg-2"
            key={i}
            href={tool.id}
            style={{ textDecoration: "none", color: "gray" }}
          >
            <div className="quick-card text-center">
              <i className={`fa-solid ${tool.icon}`}></i>
              <p>{tool.name}</p>
            </div>
          </a>
        ))}
      </div>
      {/* CURRENCY */}
      <div className="card-box mb-4 " id="currency">
        <h2>
          {" "}
          <img
            src="https://img.icons8.com/?size=100&id=53829&format=png&color=000000"
            width={"40px"}
          />
          <img
            src="https://img.icons8.com/?size=100&id=63189&format=png&color=000000"
            width={"42px"}
          />{" "}
          Currency Converter
        </h2>
        <h4 className="p-1 ps-0 bg-gold bg-gradient">
          {krw} South Korean Won = {inr} Indian Rupee
        </h4>
        <div className="row align-items-center mt-2">
          <div className="col-md-5 mb-2">
            <div className="input-box">
              <span>
                INR{" "}
                <img
                  src="https://flagcdn.com/w40/in.png"
                  alt="India"
                  width="30"
                />
              </span>{" "}
              <br />
              <div className="i-box mt-2">
                <label htmlFor="Inr">₹</label>
                <input
                  type="number"
                  className="input-i"
                  value={inr}
                  name="Inr"
                  id="Inr"
                  onChange={HandleInrChange}
                />
              </div>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <i className="fa-solid fa-right-left swap-icon"></i>
          </div>

          <div className="col-md-5 mb-2">
            <div className="input-box">
              <span>
                KRW{" "}
                <img
                  src="https://flagcdn.com/w40/kr.png"
                  alt="South Korea"
                  width="30"
                />
              </span>
              <div className="i-box mt-2">
                <label htmlFor="Krw">₩</label>
                <input
                  type="number"
                  className="input-i"
                  value={krw}
                  name="Krw"
                  id="Krw"
                  onChange={HandleKrwChange}
                />
              </div>
            </div>
          </div>
        </div>
        <small>1 INR = {rate.InrToKrw} KRW</small> <br />
        <small>1 KRW = {rate.KrwToInr} INR</small>
      </div>

      {/* WEATHER + TIME */}
      <input
        type="checkbox"
        className="ms-2"
        id="lo"
        checked={current}
        onClick={(e) => {
          setCurrent(e.target.checked);
        }}
      />{" "}
      <label htmlFor="lo"> Current Location Weather </label>
      <div className="row g-3 mb-4  p-2  align-items-center">
        {current ? (
          <div className="col-md-5" id="weather">
            <div className="card-box">
              <div className=" d-flex align-items-center mb-4">
                <img src={sunny} width={"50px"} />{" "}
                <h2 className="ms-2"> Weather in {weather?.name}</h2>
              </div>
              <div className="w-box">
                <div>
                  <h2>{weather?.main.temp}°C</h2>
                  <p>{weather?.weather[0].description}</p>
                </div>
                <div className="wind">
                  <div><img src={waterwaves} alt="" /> <p>Humidity: {weather?.main.humidity}%</p></div>
                  <div><img src={wind} alt="" /><p>Wind : {weather?.wind.speed} km/h</p></div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "",
                  textAlign: "center",
                }}
              >
                <img src={weatericon} alt="" width={"200px"} height={"200px"} />
              </div>
            </div>
          </div>
        ) : (
          <Weather />
        )}

        <div className="col-md-7" id="time">
          <div className="card-box">
            <KoreaTime />
          </div>
        </div>
      </div>
      {/* Voltage */}
      <div class="row g-2">
        <div className="col-12 d-flex gap-3" id="voltage">
          <div className="card-box d-flex flex-column ">
            <div className="in ">
              <h3>India Type</h3>
              <div className=" d-flex gap-5">
                <img src={td} alt="" className="v-img" />
                <img src={tm} alt="" className="v-img" />
              </div>
            </div>
            <div className="kr mt-2">
              <h3>SouthKorea Type</h3>
              <div className=" d-flex gap-5">
                <img src={tcf} alt="" className="v-img" />
                <img src={tcf1} alt="" className="v-img" />
              </div>
            </div>
            <div className="adap mt-2">
              <h3>Adapter</h3>
              <div className=" d-flex gap-5">
                <img src={adap} alt="" className="v-img" />
                <img src={adap1} alt="" className="v-img" />
              </div>
            </div>
          </div>
          <div className="card-box">
            <VoltagePlug />
          </div>
        </div>
      </div>
      <div className="row g-3 mt-2">
        {/* tip calculator */}
        <div className="col-md-4 col" id="tip">
          <TipCalculator />
        </div>
        <div className=" col-md-8" id="submap">
          <SubwayMap />
        </div>
      </div>
      {/* MORE TOOLS */}
      <div className="row ">
        <div className="col">
          <div className="promo-box">
            <h6 style={{ color: "darkviolet" }}>
              Make your daily life in Korea easier!
            </h6>
            <p>All the essential tools you need in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const quickTools = [
  { name: "Currency", icon: "fa-money-bill-transfer", id: "#currency" },
  { name: "Weather", icon: "fa-cloud-sun", id: "#weather" },
  { name: "Subway Map", icon: "fa-train-subway", id: "#submap" },
  { name: "Time", icon: "fa-clock", id: "#time" },
  { name: "Voltage", icon: "fa-plug", id: "#voltage" },
  { name: "Tip Calculator", icon: "fa-calculator", id: "#tip" },
];

const moreTools = [
  "Subway Map",
  "Tip Calculator",
  "Unit Converter",
  "Emergency Contacts",
];

export default DailyUse;
