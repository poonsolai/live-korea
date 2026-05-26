import React, { useEffect, useState } from "react";
import "./css/QuickTips.css";

const tipsData = [
  {
    id: 1,
    title: "Pack Early",
    description:
      "Start checking off early so you don’t forget anything important.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    id: 2,
    title: "Keep Passport Safe",
    description: "Always carry a photocopy of your passport separately.",
    image: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
  },
  {
    id: 3,
    title: "Download Offline Maps",
    description: "Useful when internet connection is slow while traveling.",
    image: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  },
  {
    id: 4,
    title: "Carry Power Bank",
    description: "Useful during long travel and emergency situations.",
    image: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png",
  },

  {
    id: 5,
    title: "Keep Emergency Contacts",
    description: "Save embassy, hotel, and emergency numbers offline.",
    image: "https://cdn-icons-png.flaticon.com/512/597/597177.png",
  },

  {
    id: 6,
    title: "Use Travel Adapter",
    description: "Different countries may use different plug types.",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048941.png",
  },

  {
    id: 7,
    title: "Carry Small Cash",
    description: "Small shops and transport may not accept cards.",
    image: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
  },

  {
    id: 8,
    title: "Check Weather Forecast",
    description: "Pack clothes based on destination weather conditions.",
    image: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
  },

  {
    id: 9,
    title: "Label Your Luggage",
    description: "Add your name and contact details on luggage bags.",
    image: "https://cdn-icons-png.flaticon.com/512/679/679720.png",
  },

  {
    id: 10,
    title: "Download Translation App",
    description: "Useful for communication in foreign countries.",
    image: "https://cdn-icons-png.flaticon.com/512/3898/3898150.png",
  },

  {
    id: 11,
    title: "Keep Medicines Ready",
    description: "Carry basic medicines and important prescriptions.",
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png",
  },

  {
    id: 12,
    title: "Arrive Early at Airport",
    description: "Reach airport 2-3 hours before international flights.",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
  },

  {
    id: 13,
    title: "Enable International Card Usage",
    description: "Make sure your debit or credit card works abroad.",
    image: "https://cdn-icons-png.flaticon.com/512/2489/2489074.png",
  },

  {
    id: 14,
    title: "Backup Important Photos",
    description: "Upload travel documents and photos to cloud storage.",
    image: "https://cdn-icons-png.flaticon.com/512/3347/3347964.png",
  },

  {
    id: 15,
    title: "Charge Devices Before Travel",
    description: "Fully charge phone, laptop, and earbuds before departure.",
    image: "https://cdn-icons-png.flaticon.com/512/3659/3659898.png",
  },
];

function QuickTips() {
  const [currentTip, setCurrentTip] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev === tipsData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quicktips-card">
      {/* TOP */}
      <div className="tips-header">
        <h5>💡 Quick Tips</h5>
      </div>

      {/* IMAGE */}
      <div className="tips-image">
        <img src={tipsData[currentTip].image} alt="tips" />
      </div>

      {/* CONTENT */}
      <div className="tips-content">
        <h6>{tipsData[currentTip].title}</h6>

        <p>{tipsData[currentTip].description}</p>
      </div>

      {/* DOTS */}
      <div className="tips-dots">
        {tipsData.map((_, index) => (
          <span
            key={index}
            className={currentTip === index ? "dot active-dot" : "dot"}
            onClick={() => setCurrentTip(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default QuickTips;
