import React, { use, useRef, useEffect, useState } from "react";
import "./css/Tourist.css";
import tourist from "../assets/tourist.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faChevronLeft,
  faMap,
  faLocation,
  faArrowRight, 
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import kimg1 from "../assets/homepage-image/south-korea.png"; // defalut image if no image found from API
import travel from "../assets/travel.jpg"; // image for travel tip section
import seoul from "../assets/Seoul.jpg"; // image for itinerary section
import busan from "../assets/Busan.jpg"; // image for itinerary section
import jeju from "../assets/jeju.jpg"; // image for itinerary section
import lux from "../assets/lux.jpg"; // image for itinerary section
import fulexp from "../assets/homepage-image/korea5.jpg"; // image for itinerary section
import Loading from "../components/Loading"; //loading component
import tour_package from "../assets/jsonfiles/south_korea_tour_packages.json";
import { usePlaceContext } from "../context/PlaceContext";
import NewCategoryBar from "../components/NewCatagoryBar";


// main component for tourist page
const Tourist = () => {
  //state variables
  const [see, setSee] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [num, setNum] = useState(8);
  const val = ["All"];
  const [recval, setRecval] = useState([]);
  let image = {
    seoul,
    busan,
    jeju,
    lux,
    fulexp,
  };

  const { place } = usePlaceContext(); // global data

  // Extract unique categories from places data
  place.forEach((item) => {
    if (!val.includes(item.category)) {
      val.push(item.category);
    }
    if (!val.includes(item.city)) {
      val.push(item.city);
    }
  });
  // recomedation trip
  function seeLoad(id) {
    const fil = tour_package.filter((i) => i.packageId == id);
    setRecval(fil);
  }
  //
  useEffect(() => {
    if (see) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }

    return () => {
      document.body.classList.remove("popup-open");
    };
  }, [see]);

  // Filters logic
  const filteredItems = place.filter((item) => {
    const matchesCat =
      category === "All" ||
      item.city === category ||
      item.category === category;
    const matchesSearch = item.name_english
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCat && matchesSearch;
  });
  // header background style with gradient overlay and tourist image
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
        rgba(255, 255, 255, 0.85) 0%, 
        rgba(255, 255, 255, 0.4) 50%, 
        rgba(255, 255, 255, 0) 90%), url(${tourist})`,
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
  };

  // open google maps in new tab with search query for the place
  function OpenMap(name) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${name}`,
      "_blank",
    );
  }
  // view all / hide toggle function for places grid
  function view() {
    if (num == 8) {
      setNum(place.length);
    } else {
      setNum(8);
    }
  }

  return (
    <>
      <div className="tourist-page container-fluid px-0">
        {/* Hero Section */}
        <header className="hero-section" style={headerStyle}>
          <div className="hero-gradient-overlay"></div>
          <div className="container-fulid p-4 position-relative ">
            <div className=" row">
              <div className="col-8 col-sm-10 col-lg-12 ">
                <h1 className="hero-title fw-bold">
                  Explore Korea{" "}
                  <span style={{ fontSize: "2rem" }}>⛩️</span>{" "}
                </h1>
                <p className="hero-desc">
                  Discover must-visit places and hidden gems across South Korea.
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
        <button
          className=" rounded-pill px-3 py-1 mapbtn"
          onClick={() => {
            OpenMap("south korea");
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faMap} /> Map View
        </button>

        {/* Top Header */}
        <div className="header-section">
          <h2 className="fw-bold">Top Attractions</h2>
          {/* Search - Functional */}
          <div className="search-container d-flex align-items-center">
            <span className="me-2">🔍</span>
            <input
              className="search-input"
              placeholder="Search places, cities or attractions..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories - Functional */}

          {filteredItems.length == 0 ? (
            ""
          ) : (
            <NewCategoryBar  val={val} setCategory={setCategory} active={category}/>
          )}
        </div>
          
        {/* Places Grid */}
        <div className="px-4 py-4">
          {filteredItems.length > 8 && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Popular Places</h4>
              {num == 8 ? (
                <span
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={view}
                >
                  View All
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              ) : (
                <span
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={view}
                >
                  Hide <FontAwesomeIcon icon={faArrowLeft} />
                </span>
              )}
            </div>
          )}

          <div className="row g-4">
            {filteredItems.length == 0 ? (
              <Loading val={"Places"} />
            ) : (
              filteredItems.slice(0, num).map((item) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                  <div className="place-card">
                    <div className="img-container">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="card-content">
                      <h6 className="fw-bold mb-1">
                        {item.name_english.length >= 20
                          ? item.name_english.slice(0, 20) + "..."
                          : item.name_english}
                      </h6>
                      <p
                        className="text-muted small mb-2 "
                        onClick={() => {
                          OpenMap(item.map_search);
                        }}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faLocation} /> {item.city}
                      </p>
                      <div className=" type-box">
                        <span className={`type-tag type-${item.category}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Travel Tip Section */}
        <div className="px-4 mb-4">
          <div className="travel-tip-box d-flex align-items-center gap-3">
            <div className="tip-icon">
              <span role="img" aria-label="star">
                ⭐
              </span>
            </div>
            <div className="tip-content">
              <h6 className="fw-bold mb-1">Travel Tip</h6>
              <p className="mb-0 text-muted small">
                Many attractions offer discounts for students and foreign
                visitors. Don't forget to bring your passport!
              </p>
            </div>
            <div className="tip-image ms-auto d-none d-sm-block">
              {/* Small passport/camera icon as seen in image */}
              <img src={travel} width={"200px"} alt="tip" />
            </div>
          </div>
        </div>

        {/* Recommended Itineraries Section */}
        <div className="px-4 py-4 ">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0">Recommended Itineraries</h5>
          </div>

          <div className="row g-3  overflow-auto pb-3 no-scrollbar flex-md-wrap">
            {tour_package.map((item, index) => (
              <div
                key={index}
                className=" col-md-4 col-12"
                onClick={() => {
                  (seeLoad(item.packageId), setSee(true));
                }}
              >
                <div className="itinerary-card-main p-3 shadow-sm border rounded-4 d-flex align-items-center gap-3">
                  <div className="itinerary-img-box">
                    <img
                      src={image[item.img]}
                      alt="Seoul"
                      className="rounded-3"
                    />
                  </div>
                  <div className="itinerary-info">
                    <div className="d-flex align-items-center gap-1 text-primary small fw-bold mb-1">
                      {item.packageName}
                    </div>
                    <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
                      {item.exp}
                    </h6>
                    <div className="box">
                      <small className="text-primary fw-bold">8 Places</small>
                      <small>{item.budgetRangeINR}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* detail box */}
      {see && (
        <div className="detail-box">
          <button className="close-btn" onClick={() => setSee(!see)}>
            ×
          </button>

          {/* LEFT CONTENT */}
          {recval.map((item, index) => (
            <div className="detail-content" key={index}>
              <div className="left-sec">
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <h1 className="title">{item.cities}</h1>{" "}
                  <span style={{ color: "darkolivegreen" }}>
                    {" "}
                    {item.duration}
                  </span>
                </div>

                <div className="budget mt-5">
                  <h3>💸 Budget</h3>

                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Flight</td>
                        <td>{item.expenseBreakdown.Flight}</td>
                      </tr>
                      <tr>
                        <td>Food</td>
                        <td>{item.expenseBreakdown.Food}</td>
                      </tr>
                      <tr>
                        <td>Hotel</td>
                        <td>{item.expenseBreakdown.Hotel}</td>
                      </tr>
                      <tr>
                        <td>Metro & Transport</td>
                        <td>{item.expenseBreakdown.Transport}</td>
                      </tr>
                      <tr>
                        <td>Shopping</td>
                        <td>{item.expenseBreakdown.Shopping}</td>
                      </tr>
                      <tr>
                        <td>Tickets & Activities</td>
                        <td>{item.expenseBreakdown.Activities}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="plan mt-5">
                  <h3>🗓️ Day Plan</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Timeline</th>
                        <th>Places</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.places.map((i, index) => (
                        <tr key={index}>
                          <td>Day-{i.day}</td>
                          <td>{i.places}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="right-sec">
                <img src={image[item.img]} alt="seoul" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Tourist;
