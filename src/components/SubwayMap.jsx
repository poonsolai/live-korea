import React, { useMemo, useState } from "react";
import "./css/SubwayMap.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTrainSubway,
  faLocationDot,
  faArrowRightArrowLeft,
  faClock,
  faRoute,
  faMapLocationDot,
  faSignal,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const subwayData = [
  {
    city: "Seoul",
    line: "Line 1",
    color: "#0052A4",
    stations: [
      "Seoul Station",
      "City Hall",
      "Jonggak",
      "Dongdaemun",
      "Cheongnyangni",
    ],
    time: "18 mins",
    crowd: "Low",
    status: "Smooth",
  },

  {
    city: "Seoul",
    line: "Line 2",
    color: "#00A84D",
    stations: [
      "Hongdae",
      "Sinchon",
      "Euljiro",
      "Jamsil",
      "Gangnam",
    ],
    time: "32 mins",
    crowd: "Medium",
    status: "Busy",
  },

  {
    city: "Seoul",
    line: "Line 4",
    color: "#00A5DE",
    stations: [
      "Myeongdong",
      "Dongdaemun",
      "Seoul Station",
      "Suyu",
    ],
    time: "14 mins",
    crowd: "Low",
    status: "Normal",
  },

  {
    city: "Busan",
    line: "Busan Line 1",
    color: "#F58220",
    stations: [
      "Nopo",
      "Seomyeon",
      "Busan Station",
      "Jagalchi",
    ],
    time: "24 mins",
    crowd: "Low",
    status: "Smooth",
  },

  {
    city: "Daegu",
    line: "Daegu Line 2",
    color: "#8B5CF6",
    stations: [
      "Banwoldang",
      "Daegu Bank",
      "Sawol",
    ],
    time: "16 mins",
    crowd: "Medium",
    status: "Normal",
  },

  {
    city: "Incheon",
    line: "AREX",
    color: "#FF4B4B",
    stations: [
      "Incheon Airport",
      "Gimpo Airport",
      "Hongdae",
      "Seoul Station",
    ],
    time: "43 mins",
    crowd: "Low",
    status: "Express",
  },
];

const SubwayMap = () => {

  const [fromStation, setFromStation] =
    useState("");

  const [toStation, setToStation] =
    useState("");

  const [selectedRoute, setSelectedRoute] =
    useState(null);

  // ALL UNIQUE STATIONS

  const allStations = useMemo(() => {

    return [
      ...new Set(
        subwayData.flatMap(
          (item) => item.stations
        )
      ),
    ].sort();

  }, []);

  // TO DROPDOWN FILTER LOGIC

  const availableToStations = useMemo(() => {

    if (!fromStation) {
      return [];
    }

    const connectedLines =
      subwayData.filter((line) =>
        line.stations.includes(fromStation)
      );

    const connectedStations =
      connectedLines.flatMap(
        (line) => line.stations
      );

    return [
      ...new Set(
        connectedStations.filter(
          (station) =>
            station !== fromStation
        )
      ),
    ].sort();

  }, [fromStation]);

  // SWAP

  const handleSwap = () => {

    if (!fromStation || !toStation) {
      return;
    }

    const temp = fromStation;

    setFromStation(toStation);

    setToStation(temp);
  };

  // SEARCH

  const handleSearch = () => {

    if (!fromStation || !toStation) {

      alert(
        "Please select both stations"
      );

      return;
    }

    const foundRoute =
      subwayData.find(
        (line) =>
          line.stations.includes(
            fromStation
          ) &&
          line.stations.includes(
            toStation
          )
      );

    if (foundRoute) {

      setSelectedRoute(foundRoute);

    } else {

      setSelectedRoute(
        "not-found"
      );

    }
  };

  return (
    <div className="subway-container">

      {/* HERO */}

      <div className="hero-section-sub">
        <div className="hero-left">
          <div className="hero-icon">

            <FontAwesomeIcon
              icon={faTrainSubway}
            />

          </div>

          <div>

            <h1>
              Korea Subway Map
            </h1>

            <p>
              Smart subway explorer
              for South Korea
            </p>

          </div>

        </div>

        <div className="live-box">
          Live Metro
        </div>

      </div>

      {/* SEARCH */}

      <div className="search-section">

        {/* FROM */}

        <div className="dropdown-box">

          <label>

            <FontAwesomeIcon
              icon={faLocationDot}
            />

            From

          </label>

          <select
            value={fromStation}
            onChange={(e) => {

              setFromStation(
                e.target.value
              );

              setToStation("");

              setSelectedRoute(
                null
              );
            }}
          >

            <option value="">
              Select Station
            </option>

            {allStations.map(
              (
                station,
                index
              ) => (

                <option
                  key={index}
                  value={station}
                >
                  {station}
                </option>

              )
            )}

          </select>

        </div>

        {/* SWAP */}

        <button
          className="swap-button"
          onClick={handleSwap}
        >

          <FontAwesomeIcon
            icon={
              faArrowRightArrowLeft
            }
          />

        </button>

        {/* TO */}

        <div className="dropdown-box">

          <label>

            <FontAwesomeIcon
              icon={faLocationDot}
            />

            To

          </label>

          <select
            value={toStation}
            onChange={(e) =>
              setToStation(
                e.target.value
              )
            }
            disabled={!fromStation}
          >

            <option value="">

              {!fromStation
                ? "Select From Station First"
                : "Select Destination"}

            </option>

            {availableToStations.map(
              (
                station,
                index
              ) => (

                <option
                  key={index}
                  value={station}
                >
                  {station}
                </option>

              )
            )}

          </select>

        </div>

        {/* SEARCH */}

        <button
          className="search-button"
          onClick={handleSearch}
        >

          <FontAwesomeIcon
            icon={
              faMagnifyingGlass
            }
          />

          Search

        </button>

      </div>

      {/* RESULT */}

      {selectedRoute &&
        selectedRoute !==
          "not-found" && (

          <div className="result-card">

            <div className="top-row">

              <div className="line-title">

                <div
                  className="line-dot"
                  style={{
                    background:
                      selectedRoute.color,
                  }}
                ></div>

                <h2>
                  {
                    selectedRoute.line
                  }
                </h2>

              </div>

              <div className="status-tag">

                <FontAwesomeIcon
                  icon={faSignal}
                />

                {
                  selectedRoute.status
                }

              </div>

            </div>

            {/* STATION ROUTE */}

            <div className="station-route">

              {selectedRoute.stations.map(
                (
                  station,
                  index
                ) => (

                  <React.Fragment
                    key={index}
                  >

                    <div
                      className={`station-pill ${
                        station ===
                          fromStation ||
                        station ===
                          toStation
                          ? "active-pill"
                          : ""
                      }`}
                    >

                      {station}

                    </div>

                    {index !==
                      selectedRoute
                        .stations
                        .length -
                        1 && (

                      <div
                        className="route-line"
                        style={{
                          background:
                            selectedRoute.color,
                        }}
                      ></div>

                    )}

                  </React.Fragment>
                )
              )}

            </div>

            {/* INFO */}

            <div className="info-grid">

              <div className="info-box">

                <FontAwesomeIcon
                  icon={faClock}
                />

                <h3>
                  {
                    selectedRoute.time
                  }
                </h3>

                <p>
                  Travel Time
                </p>

              </div>

              <div className="info-box">

                <FontAwesomeIcon
                  icon={faRoute}
                />

                <h3>
                  {
                    selectedRoute
                      .stations
                      .length
                  }
                </h3>

                <p>
                  Total Stations
                </p>

              </div>

              <div className="info-box">

                <FontAwesomeIcon
                  icon={
                    faMapLocationDot
                  }
                />

                <h3>
                  {
                    selectedRoute.city
                  }
                </h3>

                <p>
                  Metro City
                </p>

              </div>

            </div>

          </div>
        )}

      {/* NOT FOUND */}

      {selectedRoute ===
        "not-found" && (

        <div className="not-found">

          Route not available
          between selected stations

        </div>

      )}

      {/* ROUTES */}

      <div className="routes-grid">

        {subwayData.slice(0,4).map(
          (route, index) => (

            <div
              className="route-card"
              key={index}
            >

              <div className="route-header">

                <div className="line-title">

                  <div
                    className="line-dot"
                    style={{
                      background:
                        route.color,
                    }}
                  ></div>

                  <h3>
                    {route.line}
                  </h3>

                </div>

                <span>
                  {route.city}
                </span>

              </div>

              <div className="mini-route">

                {route.stations.map(
                  (
                    station,
                    index
                  ) => (

                    <React.Fragment
                      key={index}
                    >

                      <div className="mini-pill">

                        {station}

                      </div>

                      {index !==
                        route.stations
                          .length -
                          1 && (

                        <div
                          className="mini-line"
                          style={{
                            background:
                              route.color,
                          }}
                        ></div>

                      )}

                    </React.Fragment>
                  )
                )}

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default SubwayMap;