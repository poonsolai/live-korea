import React, { useEffect, useState } from "react";
import "./css/LanguagePage.css";
import language from "../assets/language.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faStar,
  faLightbulb,
  faChevronLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CategoryBar from "../components/CatagoryBar";
// import backend api
import API from "../api";

const LanguagePage = () => {
  // state variables
  const [search, setSearch] = useState("");
  // const [favorites, setFavorites] = useState([]);
  const [phrase, setPhrase] = useState([]);
  const [cat, setCat] = useState('All');
  // number of items to show
  const [num, setNum] = useState(5);
  // fetch phrases from database
  async function PhraseDataCollecter() {
    const res = await axios.get(`${API}/api/phrases`, {
      withCredentials: true,
    });
    setPhrase(res.data.phrases);
  }
  // first time load - get phrases and favorites from local storage
  useEffect(() => {
    window.speechSynthesis.getVoices();
    PhraseDataCollecter();
  }, []);
  // view all phrases
  function view(){
    if(num === 5){
      setNum(phrase.length);
    }else{
      setNum(5);
    }
  }
  // speak the word 
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ko-KR";
    speech.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };
  // store a fav parses
  const toggleFav = async (item) => {
    const res = await axios.patch(`${API}/api/favorite`,{id:item._id});
    PhraseDataCollecter();
  };

  const filtered = phrase.filter(
    (item) =>
      item.english.toLowerCase().includes(search.toLowerCase()) ||
      item.korean.includes(search),
  );
  const catFiltered = cat === "All" ? filtered : cat === "Fav"? filtered.filter((item)=> item.isFavorite) :filtered.filter((item) => item.category === cat.toLowerCase());
  //header background style with gradient overlay and image
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
        rgba(255, 255, 255, 0.85) 0%, 
        rgba(255, 255, 255, 0.4) 50%, 
        rgba(255, 255, 255, 0) 90%), url(${language})`,
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container-fluid  p-0">
      {/* HEADER */}
      <div className="hero-section" style={headerStyle}>
        <div className="hero-gradient-overlay"></div>
        {/* HERO CONTENT */}
        <div className="container-fulid p-4 position-relative ">
          <div className=" row">
            <div className="col-8 col-sm-10 col-lg-12 ">
              <h1 className="hero-title fw-bold">
                {" "}
                Learn <span className="text-primary">Korean</span> 💬{" "}
              </h1>
              <p className="hero-desc">
                Learn common Korean phrases with audio pronunciation and
                examples.
              </p>
            </div>
          </div>
        </div>
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
      </div>
      <div className="px-3">
        {/* SEARCH */}
        <div className="search-box mb-3">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search phrases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TITLE */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Common Phrases</h5>
          <span className="text-primary small view" onClick={view}>{num === 5 ? "View all" : 'Hide'} →</span>
        </div>
        <CategoryBar setCat={setCat} cat={cat}/>
        {/* LIST */}
        {catFiltered.slice(0, num).map((item, index) => (
          <div key={index} className="phrase-card">
            <div className="phrase-left">
              <div className="icon-circle">👤</div>

              <div>
                <h6>{item.korean}</h6>
                <small className="text-muted">{item.romanized}</small>
                <p className="mb-0">{item.english}</p>
              </div>
            </div>

            <div className="phrase-actions">
              <div className="icon-btn" onClick={() => speak(item.korean)}>
                <FontAwesomeIcon icon={faVolumeUp} />
              </div>
              <FontAwesomeIcon
                icon={faStar}
                className={
                  item.isFavorite ? "star active" : "star"
                }
                onClick={() => {toggleFav(item)}}
              /> 
            </div>
          </div>
        ))}

        {/* TIPS */}
        <div className="tips-box mt-4">
          <h6>
            {" "}
            <FontAwesomeIcon icon={faLightbulb} /> Language Tips
          </h6>
          <p className="mb-0 small">
            <b>Tip:</b> Koreans appreciate polite language.
          </p>
          <p>Try ending sentences with "R (yo)" for politeness.</p>
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
