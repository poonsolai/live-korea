import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Map move helper
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 14);
  return null;
};

const MapView = ({ selectedCategory }) => {
  const [position, setPosition] = useState([13.0827, 80.2707]); // default Chennai
  const [places, setPlaces] = useState([]);

  // 🟢 Get User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setPosition(coords);
    });
  }, []);

  // 🟢 Fetch Nearby Places
  const fetchPlaces = async (type) => {
    const query = `
      [out:json];
      node["amenity"="${type}"](around:2000, ${position[0]}, ${position[1]});
      out;
    `;

    const url =
      "https://overpass-api.de/api/interpreter?data=" +
      encodeURIComponent(query);

    const res = await fetch(url);
    const data = await res.json();

    return data.elements.map((item) => ({
      lat: item.lat,
      lng: item.lon,
      name: item.tags?.name || type,
    }));
  };

  // 🟢 Handle Category Change
  useEffect(() => {
    const loadData = async () => {
      let results = [];

      if (selectedCategory === "all") {
        const hospital = await fetchPlaces("hospital");
        const atm = await fetchPlaces("atm");
        const police = await fetchPlaces("police");
        results = [...hospital, ...atm, ...police];
      } else {
        results = await fetchPlaces(selectedCategory);
      }

      setPlaces(results);
    };

    loadData();
  }, [selectedCategory, position]);

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer center={position} zoom={14} style={{ height: "100%" }}>
        <ChangeView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🟢 User Location */}
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>

        {/* 🟢 Nearby Places */}
        {places.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lng]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;