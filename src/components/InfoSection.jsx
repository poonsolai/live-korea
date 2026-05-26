import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faHeart, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';
import './css/InfoSection.css';

const InfoSection = () => {
  const infoData = [
    { title: "Safe & Reliable", desc: "Curated information from trusted sources.", icon: faShieldAlt, color: "bg-cyan" },
    { title: "Beginner Friendly", desc: "Simple language and easy to understand.", icon: faHeart, color: "bg-pink" },
    { title: "Made for Foreigners", desc: "Specially designed for students & workers.", icon: faGlobe, color: "bg-blue" },
    { title: "All in One Place", desc: "Everything you need for life in Korea.", icon: faStar, color: "bg-gold" }
  ];

  return (
    <div className="container info-row">
      <div className="row g-2 g-md-3 row-cols-2 row-cols-lg-4">
        {infoData.map((item, index) => (
          <div className="col" key={index}>
            <div className="info-box shadow-sm">
              <div className={`info-icon-wrapper ${item.color}`}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className="info-content">
                <h6 className="info-title">{item.title}</h6>
                <p className="info-text d-none d-md-block">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
