import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";

import "./css/LocationPage.css";

const GEOAPIFY_API = "75bfeb3ae9db4d5e95d866b2087fd7e3";
const PEXELS_API = "K4FzadQdtMN82iQB6Gz5tytulirVPi5Xq6C2jQK1JaBAxRYyMQDa85EI";

const categories = [
  {
    id: "commercial.supermarket",
    name: "Supermarkets",
    icon: "fa-store",
    color: "#7c4dff",
  },
  {
    id: "catering.restaurant",
    name: "Restaurants",
    icon: "fa-utensils",
    color: "#ff8f3d",
  },
  {
    id: "catering.cafe",
    name: "Cafes",
    icon: "fa-mug-hot",
    color: "#8b5e3c",
  },
  {
    id: "healthcare.hospital",
    name: "Hospitals",
    icon: "fa-hospital",
    color: "#ff4d6d",
  },
  {
    id: "healthcare.pharmacy",
    name: "Pharmacy",
    icon: "fa-prescription-bottle-medical",
    color: "#1db954",
  },
  {
    id: "service.financial.atm",
    name: "ATMs",
    icon: "fa-money-bill-wave",
    color: "#00b894",
  },
  {
    id: "tourism.attraction",
    name: "Tourist",
    icon: "fa-camera",
    color: "#ff4fa3",
  },
  {
    id: "accommodation.hotel",
    name: "Hotels",
    icon: "fa-hotel",
    color: "#00bcd4",
  },
  {
    id: "public_transport.subway",
    name: "Subway",
    icon: "fa-train-subway",
    color: "#8e44ad",
  },
  {
    id: "public_transport.bus",
    name: "Bus Stops",
    icon: "fa-bus",
    color: "#3498db",
  },
  {
    id: "parking",
    name: "Parking",
    icon: "fa-square-parking",
    color: "#4a6cf7",
  },
  {
    id: "education.school",
    name: "Schools",
    icon: "fa-school",
    color: "#ff9800",
  },
];

export default function LocationPage() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "catering.restaurant"
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [locationName, setLocationName] = useState("");

  // CURRENT LOCATION
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // GET CURRENT LOCATION
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation({ lat, lon });

        setMapSrc(
          `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`
        );

        reverseGeocode(lat, lon);

        fetchNearbyPlaces(lat, lon, selectedCategory);
      },
      (error) => {
        console.log(error);
        alert("Please allow location access");
      }
    );
  };

  // REVERSE GEOCODE
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API}`
      );

      setLocationName(
        res.data.features[0]?.properties?.formatted || "Current Location"
      );
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH PLACE
  const searchPlace = async () => {
    if (!search) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${search}&limit=1&apiKey=${GEOAPIFY_API}`
      );

      if (res.data.features.length === 0) {
        alert("Place not found");
        setLoading(false);
        return;
      }

      const result = res.data.features[0];

      const lat = result.properties.lat;
      const lon = result.properties.lon;

      setLocation({ lat, lon });

      setLocationName(result.properties.formatted);

      setMapSrc(
        `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`
      );

      fetchNearbyPlaces(lat, lon, selectedCategory);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // PEXELS IMAGE
  const getPexelsImage = async (query) => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API,
          },
        }
      );

      return (
        response.data.photos[0]?.src?.large ||
        "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg"
      );
    } catch (err) {
      return "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg";
    }
  };

  // FETCH NEARBY PLACES
  const fetchNearbyPlaces = async (lat, lon, category) => {
    try {
      setLoading(true);

      setSelectedCategory(category);

      const res = await axios.get(
        `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=30&apiKey=${GEOAPIFY_API}`
      );

      const data = await Promise.all(
        res.data.features.map(async (item) => {
          const props = item.properties;

          const image = await getPexelsImage(
            `${props.name || category} ${locationName}`
          );

          return {
            id: props.place_id,
            name: props.name || "Unknown Place",
            address: props.formatted || "No Address",
            lat: props.lat,
            lon: props.lon,
            distance: props.distance || 0,
            image,
            category,
          };
        })
      );

      setPlaces(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // GOOGLE MAP
  const openGoogleMap = (lat, lon) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
      "_blank"
    );
  };

  return (
    <Container fluid className="location-page">
      {/* TOP */}
      <div className="top-section">
        <div>
          <h2>Location</h2>
          <p>{locationName}</p>
        </div>

        <Button className="my-location-btn" onClick={getCurrentLocation}>
          <i className="fa-solid fa-location-crosshairs"></i>
          My Location
        </Button>
      </div>

      {/* SEARCH */}
      <div className="search-wrapper">
        <Form.Control
          type="text"
          placeholder="Search place..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchPlace();
            }
          }}
        />

        <Button onClick={searchPlace}>
          <i className="fa-solid fa-search"></i>
        </Button>
      </div>

      {/* MAP */}
      <div className="map-wrapper">
        <iframe
          title="Google Map"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
        />

        <Button
          className="open-map-btn"
          onClick={() => {
            if (location) {
              openGoogleMap(location.lat, location.lon);
            }
          }}
        >
          Open in Map
        </Button>
      </div>

      {/* CATEGORY */}
      <div className="category-scroll">
        {categories.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className={`category-card ${
              selectedCategory === item.id ? "active-category" : ""
            }`}
            onClick={() => {
              if (location) {
                fetchNearbyPlaces(location.lat, location.lon, item.id);
              }
            }}
          >
            <div
              className="category-icon"
              style={{
                background: item.color + "20",
              }}
            >
              <i
                className={`fa-solid ${item.icon}`}
                style={{ color: item.color }}
              ></i>
            </div>

            <h6>{item.name}</h6>
          </div>
        ))}

        <div
          className="category-card"
          onClick={() => setShowModal(true)}
        >
          <div className="category-icon">
            <i className="fa-solid fa-ellipsis"></i>
          </div>

          <h6>More</h6>
        </div>
      </div>

      {/* TITLE */}
      <div className="nearby-header">
        <h4>Nearby Places</h4>

        <span>
          {places.length} Places Found
        </span>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="loader-box">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {places.map((place) => (
            <Col lg={4} md={6} sm={12} key={place.id}>
              <Card className="place-card">
                <div className="image-wrapper">
                  <Card.Img variant="top" src={place.image} />

                  <div className="distance-badge">
                    {Math.round(place.distance)} m
                  </div>
                </div>

                <Card.Body>
                  <h5>{place.name}</h5>

                  <p>{place.address}</p>

                  <div className="card-buttons">
                    <Button
                      className="direction-btn"
                      onClick={() =>
                        openGoogleMap(place.lat, place.lon)
                      }
                    >
                      <i className="fa-solid fa-location-arrow"></i>
                      Directions
                    </Button>

                    <Button
                      className="view-btn"
                      onClick={() => {
                        setMapSrc(
                          `https://maps.google.com/maps?q=${place.lat},${place.lon}&z=16&output=embed`
                        );
                      }}
                    >
                      <i className="fa-solid fa-map"></i>
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* MODAL */}
      <Modal
        show={showModal}
        centered
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>More Categories</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-grid">
            {categories.map((item) => (
              <div
                key={item.id}
                className="modal-category"
                onClick={() => {
                  setShowModal(false);

                  if (location) {
                    fetchNearbyPlaces(
                      location.lat,
                      location.lon,
                      item.id
                    );
                  }
                }}
              >
                <div
                  className="modal-icon"
                  style={{
                    background: item.color + "20",
                  }}
                >
                  <i
                    className={`fa-solid ${item.icon}`}
                    style={{ color: item.color }}
                  ></i>
                </div>

                <h6>{item.name}</h6>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}