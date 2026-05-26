import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CatagoryBar.css';

const initialCategories = [
  { id: 1, name: 'All', icon: '🏠'},
  { id: 3, name: 'Travel', icon: '💼' },
  { id: 2, name: 'Greetings', icon: '👋'},
  { id: 4, name: 'Food', icon: '🍲' },
  { id: 5, name: 'Emergency', icon: '🚨' },
  { id: 6, name: 'Shopping', icon: '🛍️' },
  { id: 7, name: 'Numbers', icon: '🔢' },
  { id: 8, name: 'Family', icon: '👨‍👩‍👧' },
  { id: 9, name: 'Places', icon: '📍'},
  { id: 10, name: 'Time', icon: '⏰'},
  { id: 11, name: 'Fav', icon: '🤗'},
];

const CategoryBar = ({cat, setCat}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [activeTab, setActiveTab] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const visibleCount = 3;

  // 📱 detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 click outside close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 click logic
  const handleCategoryClick = (id, fromHidden = false) => {
    setActiveTab(id);

    // 👉 ONLY mobile hidden click logic
    if (isMobile && fromHidden) {
      const selected = categories.find(c => c.id === id);
      const others = categories.filter(c => c.id !== id);

      const newArr = [
        ...others.slice(0, 2),
        selected,
        ...others.slice(2),
      ];

      setCategories(newArr);
    }

    setIsExpanded(false);
  };

  const visibleCategories = categories.slice(0, visibleCount);
  const hiddenCategories = categories.slice(visibleCount);

  return (
    <div className="container-fulid mt-3">
      <div className="category-header-row">

        <div className="category-main-list">

          {/* 💻 DESKTOP VIEW */}
          {!isMobile &&
            categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-item-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => {handleCategoryClick(cat.id); setCat(cat.name)}}
              >
                {cat.icon} {cat.name}
              </div>
            ))
          }

          {/* 📱 MOBILE VIEW */}
          {isMobile && (
            <>
              {visibleCategories.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-item-btn ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => {handleCategoryClick(cat.id); setCat(cat.name)}}
                >
                  {cat.icon} {cat.name}
                </div>
              ))}

              {/* arrow */}
              {hiddenCategories.length > 0 && (
                <div className="arrow-wrapper" ref={menuRef}>

                  <div
                    className="category-item-btn arrow-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? '⬅️' : '➡️'}
                  </div>

                  {/* dropdown */}
                  {isExpanded && (
                    <div className="floating-menu">
                      {hiddenCategories.map((cat) => (
                        <div
                          key={cat.id}
                          className={`menu-row ${activeTab === cat.id ? 'active' : ''}`}
                          onClick={() => handleCategoryClick(cat.id, true)}
                        >
                          {cat.icon} {cat.name}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default CategoryBar;