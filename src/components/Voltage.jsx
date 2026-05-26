import React, { useState } from "react";
import './css/Voltage.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBolt,
  faPlug,
  faGlobe,
  faTriangleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const countryData = [
  {
    country: "South Korea",
    voltage: "220V",
    frequency: "60Hz",
    plugs: ["Type C", "Type F"],
    adapter: true,
    compatible: true,
  },
  {
    country: "India",
    voltage: "230V",
    frequency: "50Hz",
    plugs: ["Type C", "Type D", "Type M"],
    adapter: false,
    compatible: true,
  },
  {
    country: "Japan",
    voltage: "100V",
    frequency: "50/60Hz",
    plugs: ["Type A", "Type B"],
    adapter: true,
    compatible: false,
  },
];

const VoltagePlug = () => {
  const [selectedCountry, setSelectedCountry] =
    useState("South Korea");

  const data = countryData.find(
    (item) => item.country === selectedCountry
  );

  return (
   
      <div className="">
        {/* Header */}
        <div className="voltage-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faPlug} />
          </div>

          <div>
            <h2>Voltage & Plug Type</h2>
            <p>Travel power compatibility guide</p>
          </div>
        </div>

        {/* Select */}
        <div className="country-select-box">
          <label>Select Country</label>

          <select
            value={selectedCountry}
            onChange={(e) =>
              setSelectedCountry(e.target.value)
            }
          >
            {countryData.map((item, index) => (
              <option key={index} value={item.country}>
                {item.country}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div className="details-grid">
          {/* Voltage */}
          <div className="detail-card">
            <FontAwesomeIcon
              icon={faBolt}
              className="detail-icon yellow"
            />

            <h4>Voltage</h4>
            <p>{data.voltage}</p>
          </div>

          {/* Frequency */}
          <div className="detail-card">
            <FontAwesomeIcon
              icon={faGlobe}
              className="detail-icon blue"
            />

            <h4>Frequency</h4>
            <p>{data.frequency}</p>
          </div>

          {/* Plug Types */}
          <div className="detail-card">
            <FontAwesomeIcon
              icon={faPlug}
              className="detail-icon purple"
            />

            <h4>Plug Types</h4>

            <div className="plug-list">
              {data.plugs.map((plug, index) => (
                <span key={index} className="plug-badge">
                  {plug}
                </span>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="detail-card">
            <FontAwesomeIcon
              icon={
                data.compatible
                  ? faCircleCheck
                  : faTriangleExclamation
              }
              className={`detail-icon ${
                data.compatible ? "green" : "red"
              }`}
            />

            <h4>Compatibility</h4>

            <p>
              {data.compatible
                ? "Most mobile/laptop chargers supported"
                : "Voltage converter required"}
            </p>
          </div>
        </div>

        {/* Adapter Alert */}
        <div
          className={`adapter-box ${
            data.adapter ? "warning" : "safe"
          }`}
        >
          <FontAwesomeIcon
            icon={
              data.adapter
                ? faTriangleExclamation
                : faCircleCheck
            }
          />

          <span>
            {data.adapter
              ? "Adapter Recommended for this country"
              : "No adapter needed"}
          </span>
        </div>
      </div>
    
  );
};

export default VoltagePlug;