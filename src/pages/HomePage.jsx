import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, faLanguage, faUtensils, faExclamationTriangle, 
  faArchway, faLightbulb, faClipboardList, faThLarge 
} from '@fortawesome/free-solid-svg-icons';
import './css/HomePage.css';
import Navbar from '../components/Navbar';
import InfoSection from '../components/InfoSection';
// 1. Ella images-aiyum import pannunga
import img from '../assets/homepage-image/korea.webp';
import img1 from '../assets/homepage-image/korea1.jpg';
import img2 from '../assets/homepage-image/korea2.jpg';
import img3 from '../assets/homepage-image/korea3.jpg';
import img4 from '../assets/homepage-image/korea4.jpg';
import img5 from '../assets/homepage-image/korea5.jpg';
import img6 from '../assets/homepage-image/korea6.jpg';
import img7 from '../assets/homepage-image/korea7.jpg';
import img8 from '../assets/homepage-image/korea8.jpg';
import img9 from '../assets/homepage-image/korea9.jpg';
import img10 from '../assets/homepage-image/korea10.jpg';
import img11 from '../assets/homepage-image/korea11.jpg';
import img12 from '../assets/homepage-image/korea12.jpg';
import img13 from '../assets/homepage-image/korea13.jpg';
import img14 from '../assets/homepage-image/korea14.jpg';
import kr from '../assets/homepage-image/south-korea.png';

const HomePage = () => {
  // Images-ai oru array-la podunga
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];

  // Current background image-ai store panna state
  const [bgImage, setBgImage] = useState('');

  // Page refresh aagum pothu (component mount aagum pothu) random image select aagum
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setBgImage(images[randomIndex]);
  }, []); // [] irukkuradhala refresh pannumbothu mattum nadakkum
   // Hero section style (White shade gradient + random image)
  const headerStyle = {
    backgroundImage: `linear-gradient(90deg, 
      rgba(255, 255, 255, 0.85) 0%, 
      rgba(255, 255, 255, 0.4) 50%, 
      rgba(255, 255, 255, 0) 90%), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
    backgroundRepeat: 'no-repeat'
  };
  const menuItems = [
    { title: "Location", icon: faMapMarkerAlt, style: "location", linkText: "Find Nearby Places", desc: "Find nearby hospitals, ATMs, police stations and more.", link: "/location" },
    { title: "Language", icon: faLanguage, style: "language", linkText: "Explore Phrases", desc: "Learn common Korean phrases with audio pronunciation.", link: "/language" },
    { title: "Food", icon: faUtensils, style: "food", linkText: "Explore Food", desc: "Discover Korean food with veg / non-veg options.", link: "/food" },
    { title: "Emergency", icon: faExclamationTriangle, style: "emergency", linkText: "Get Help", desc: "Important contacts and tips for emergency situations.", link: "/emergency" },
    { title: "Tourist Places", icon: faArchway, style: "tourist", linkText: "View Places", desc: "Explore popular places with images and map links.", link: "/tourist" },
    { title: "Life Tips", icon: faLightbulb, style: "tips", linkText: "Read Tips", desc: "Cultural tips, rules and do's & don'ts.", link: "/tips" },
    { title: "Checklist", icon: faClipboardList, style: "checklist", linkText: "View Checklist", desc: "Pre-travel checklist to help you prepare better.", link: "/checklist" },
    { title: "Daily Use", icon: faThLarge, style: "daily", linkText: "Open Tools", desc: "Useful daily tools like currency converter, weather & time.", link: "/daily-use" },
  ];

  return (
    <div className="home-container pb-2">
      {/* Hero Section */}
      <header className="hero-section" style={headerStyle}>
        <div className="hero-gradient-overlay"></div>
        <div className="container-fulid p-5 position-relative">
          <div className="row">
            <div className="col-8 col-sm-10 col-lg-12">
              <span className="welcome-label" style={{color:"pink", fontSize:"25px"}}>Welcome to</span>
              <h1 className="hero-title">Life in <span style={{color:"blue"}}>Korea</span> <img src={kr} style={{width:"50px", height:"50px"}}/></h1>
              <p className="hero-desc">Everything you need to live, travel, and survive comfortably in South Korea.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <main className="container-fulid p-3 py-5" >
        <div className="row g-4">
          {menuItems.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-xl-4">
              <div className="feature-card shadow-sm border-0">
                <div className={`icon-box ${item.style}`}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div className="card-content">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-desc">{item.desc}</p>
                  <Link to={item.link} className={`card-link text-decoration-none text-${item.style}`}>
                    {item.linkText} <span className="ms-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <InfoSection/>
      <Navbar/>
    </div>
    
  );
};

export default HomePage;
