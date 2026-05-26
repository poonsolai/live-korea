import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faMapMarkerAlt, faLanguage, faUtensils, 
  faExclamationTriangle, faArchway, faLightbulb, 
  faClipboardList, faThLarge, faBars 
} from '@fortawesome/free-solid-svg-icons';
import './css/Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allLinks = [
    { title: "Home", icon: faHome, path: "/" },
    { title: "Location", icon: faMapMarkerAlt, path: "/location" },
    { title: "Language", icon: faLanguage, path: "/language" },
    { title: "Food", icon: faUtensils, path: "/food" },
    { title: "Emergency", icon: faExclamationTriangle, path: "/emergency" },
    { title: "Tourist", icon: faArchway, path: "/tourist" },
    { title: "Tips", icon: faLightbulb, path: "/tips" },
    { title: "Checklist", icon: faClipboardList, path: "/checklist" },
    { title: "Daily", icon: faThLarge, path: "/daily-use" },
  ];

  return (
    <>
      {/* MOBILE MORE MENU */}
      {isMobile && showMore && (
        <div className="more-menu-overlay">
          {allLinks.slice(5).map((link, idx) => (
            <Link key={idx} to={link.path} className="more-item" onClick={() => setShowMore(false)}>
              <FontAwesomeIcon icon={link.icon} style={{width: '20px'}} />
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      )}

      {/* MAIN NAVBAR */}
      <nav className="custom-bottom-nav">
        {/* LAPTOP: Ellame theriyum | MOBILE: First 5 links mattum */}
        {(isMobile ? allLinks.slice(0, 5) : allLinks).map((link, index) => (
          <Link 
            key={index} 
            to={link.path} 
            className={`nav-item-box ${location.pathname === link.path ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={link.icon} className="nav-icon" />
            <span className="nav-label">{link.title}</span>
          </Link>
        ))}

        {/* MOBILE ONLY MORE BUTTON */}
        {isMobile && (
          <div className="nav-item-box more-menu-btn" onClick={() => setShowMore(!showMore)}>
            <FontAwesomeIcon icon={faBars} className="nav-icon" />
            <span className="nav-label">More</span>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
