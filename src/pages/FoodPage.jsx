import React, { useState, useRef, useEffect } from "react";
import "./css/FoodPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import food from "../assets/Food.jpg";
import { Link, replace } from "react-router-dom";
import kimg1 from "../assets/homepage-image/south-korea.png"; // defalut image if no image found from API
import axios from "axios";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
  faArrowRight,
  faUtensils,
  faFireAlt,
  faStore,
  faLandmark,
  faLeaf,
  faMugHot,
  faIceCream,
  faEllipsisH,
  faPaperPlane,
  faLemon,
  faLocationPinLock,
  faLocationPin,
  faLocationDot,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import Loading from "../components/Loading";
import { useFoodContext } from "../context/FoodContext.jsx";
import { useRestaurantContext } from "../context/RestaurantContex.jsx";
import NewCategoryBar from "../components/NewCatagoryBar.jsx";

const FoodPage = () => {
  //state variables
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  //
  const [show, setShow] = useState(false);
  const [num, setNum] = useState(8);
  //
  const { fooditems } = useFoodContext(); // global data
  const { resplace } = useRestaurantContext(); // global data
  //
  const [filval, setFilval] = useState({High:true, Low:false, Medium:false})
  // catagory
  const categories = ['All',  "Korean BBQ", "Street Food", "Traditional",'Mixed',"Veg / Vegan","Non Veg","Cafes", "Desserts"]
  //
  const [searchTerm, setSearchTerm] = useState("");
  //handle form
  const HandleForm = (e)=>{
    setFilval({...filval, [e.target.name] : e.target.checked});
  }

  // Smart Arrow Logic
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


  // header background imagee
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
          rgba(255, 255, 255, 0.85) 0%, 
          rgba(255, 255, 255, 0.4) 50%, 
          rgba(255, 255, 255, 0) 90%), url(${food})`,
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
  };

  // Filters logic
  const filteredItems = fooditems.filter((item) => {
    const matchesCat =
      activeCategory === "All" ||
      item.type === activeCategory ||
      item.category === activeCategory;
     const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCat && matchesSearch;
  });
  //view function
  function viewFunc() {
    if (num == 8) {
      setNum(filteredItems.length);
    } else {
      setNum(8);
    }
  }
  function viewMap(name) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${name}`,
      "_blank",
    );
  }
  

  // filter for restaurant
  const filterRestaurant = resplace.filter((item) => {
  const conditions = [];
  // High checkbox checked
  if (filval.High) {
    conditions.push(item.budgetType === "High");
  }
  // Medium checkbox checked
  if (filval.Medium) {
    conditions.push(item.budgetType === "Medium");
  }
  // Low checkbox checked
  if (filval.Low) {
    conditions.push(item.budgetType === "Low");
  }
  // If no checkbox selected → show all
  if (conditions.length === 0) {
    return true;
  }
  // Any one condition match aana data return
  return conditions.some(Boolean);
});

  
  return (
    <div className="food-page-main bg-white min-vh-100">
      <div className="container-fluid px-0">
        {/* HEADER */}
        <header className="hero-section" style={headerStyle}>
          <div className="hero-gradient-overlay"></div>
          <div className="container-fulid p-4 position-relative ">
            <div className=" row">
              <div className="col-8 col-sm-10 col-lg-12 ">
                <span className="badge bg-white text-success rounded-pill mb-2 px-3 py-2 fw-bold shadow-sm small-badge">
                  Taste Korea ♡
                </span>
                <h2 className="fw-bold display-6 banner-title">
                  Good Food,
                  <br />
                  Better Experience!
                </h2>
                <p className="hero-desc">
                  Discover must-try all foods and drinks gems across South
                  Korea.
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

        {/* Search - Functional */}
          <div className="search-container d-flex align-items-center mt-4 mx-2">
            <span className="me-2">🔍</span>
            <input
              className="search-input"
              placeholder="Search Foods "
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        {filteredItems.length == 0 ? (
          ""
        ) : (
          <NewCategoryBar val={categories} setCategory={setActiveCategory} active={activeCategory}/>
        )}

        {/* POPULAR DISHES */}
        <section className="mb-5 px-3">
          <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
            <h1 className="fw-bold mb-0 section-title">Popular Dishes</h1>
            {num == 8 ? (
              <span
                className="text-success small fw-bold "
                onClick={() => {
                  viewFunc();
                }}
              >
                View All <FontAwesomeIcon icon={faArrowRight} />
              </span>
            ) : (
              <span
                className="text-success small fw-bold "
                onClick={() => {
                  viewFunc();
                }}
              >
                Hide <FontAwesomeIcon icon={faArrowLeft} />
              </span>
            )}
          </div>
          <div className="row g-3">
            {filteredItems.length == 0 ? (
              <Loading val={"Foods"} />
            ) : (
              filteredItems.slice(0, num).map((dish) => (
                <div key={dish.id} className="col-6 col-md-4 col-lg-3">
                  <div className="dish-card-custom bg-white shadow-sm rounded-4 p-2 h-100">
                    <div className="position-relative mb-2">
                      <img
                        src={dish.image}
                        className="rounded-4 w-100 dish-img-fixed "
                        alt={dish.name}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h6 className="fw-bold mb-0 text-truncate dish-name">
                        {dish.name}
                      </h6>
                      
                      <p className="text-muted mb-1 text-truncate dish-desc mt-2">
                        ₩ {dish.price_won}
                      </p>
                    </div>
                    <span className=" text-secondary small "> {dish.category}</span>
                    <p> {dish.type}</p>
                    <div className="d-flex align-items-center text-success fw-bold dish-rating">
                      <FontAwesomeIcon icon={faLocationDot} className="me-1" />
                      {dish.origin_location}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* net start MongoDB  local server run cmd*/}
        {/* NEARBY RESTAURANTS */}
        <section className="mb-5 px-3">
          <div className="d-flex justify-content-between align-items-center mb-3"  style={{position:'relative'}}>
            <h6 className="fw-bold mb-0 section-title">Famous Restaurants</h6>
            <span className="text-muted small " onClick={()=>{setShow(!show)}}>
              Filter{" "}
              <FontAwesomeIcon icon={faPaperPlane} className="ms-1 small" />
            </span> 
            {
              show &&
              <div className="filter-tool-box">
                <div className="high" >
                  <input type="checkbox" name="High" id="High" onChange={HandleForm} checked={filval.High}/> <label htmlFor="High">High</label>
                </div>
                <div className="high" >
                  <input type="checkbox" name="Low" id="Low" onChange={HandleForm} checked={filval.Low}/> <label htmlFor="Low">Low</label>
                </div>
                <div className="high" >
                  <input type="checkbox" name="Medium" id="Medium" onChange={HandleForm} checked={filval.Medium}/> <label htmlFor="Medium">Medium</label>
                </div>
              </div>
            }
          </div>
          {filterRestaurant.length == 0 ? (
            <Loading val={"Restaurant"} />
          ) : (
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-3 bg-white ">
              {filterRestaurant.map((i) => (
                <div className="d-flex gap-3 position-relative mt-3 res-box">
                  <img
                    src={i.image}
                    className="rounded-3 rest-img"
                    alt={i.name}
                  />
                  <div className="flex-grow-1 mt-2">
                    <h6 className="fw-bold mb-0 rest-name">{i.name}</h6>
                    <p className="text-muted mb-1 rest-type">
                      {i.category}•{" "}
                      <span className="ms-2 fw-bold ">
                        {" "}
                        ₹ {i.indianPriceINR}
                      </span>{" "}
                      <span className="ms-2"> ₩ {i.krPrice}</span>
                    </p>
                    <div className="d-flex align-items-center gap-2 rest-meta">
                      <span
                        className="text-success fw-bold"
                        style={{ textDecoration: "line-through" }}
                      >
                        <FontAwesomeIcon icon={faStar} /> 0.0 (0.0k)
                      </span> 
                      <span className="type">{i.budgetType} Budget</span>
                    </div>
                    {i.famousFood.map((f, index) => (
                      <span className=" rest-time mt-0 pt-0 type-1 me-1">{` ${f} `}</span>
                    ))}

                    <div className="text-success fw-bold rest-time">
                      Open {i.openTime} - Close {i.closeTime}
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 m-1 direction-btn"
                    onClick={() => {
                      viewMap(i.imageSearchKeyword);
                    }}
                  >
                    Directions{" "}
                    <FontAwesomeIcon icon={faPaperPlane} className="ms-1" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* TIP BOX */}
        <div className="tip-box-custom rounded-4 p-3 d-flex align-items-center gap-3">
          <span className="fs-3">💡</span>
          <p className="mb-0 text-success fw-bold small-text">
            Tip: Don't miss trying local street food and seasonal specialties!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
