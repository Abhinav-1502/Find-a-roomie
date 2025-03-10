// MapComponent.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

interface Coordinate {
  lat: number;
  lon: number;
  address: string;
}

interface MapComponentProps {
  addresses: string[];
}

const MapComponent: React.FC<MapComponentProps> = ({ addresses }) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const promises = addresses.map(async (address) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            address
          };
        }
        return null;
      });

      const newCoordinates = (await Promise.all(promises)).filter(
        (coord) => coord !== null
      ) as Coordinate[];
      setCoordinates(newCoordinates);
    };

    fetchCoordinates();
  }, [addresses]);

  return (
    <MapContainer center={[0, 0]} zoom={3} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={[coord.lat, coord.lon]} icon={icon}>
          <Popup>
            <div>
              <p>{coord.address}</p>
              <Link to={`/details/${index}`}>Details</Link> {/* Change the link path as needed */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
