// MapComponent.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

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
  address: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const newCoordinate: Coordinate = {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            address
          };
          setCoordinate(newCoordinate);
        } else {
          setCoordinate(null);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setCoordinate(null);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <MapContainer center={[0, 0]} zoom={3} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinate ? (
        <Marker position={[coordinate.lat, coordinate.lon]} icon={icon}>
          <Popup>
            <div>
              <p style={{ fontSize: "1.5rem" }}>{coordinate.address}</p>
              <Link to={`/details`}>Details</Link>
            </div>
          </Popup>
        </Marker>
      ) : (
        <div>Loading...</div>
      )}
    </MapContainer>
  );
};

export default MapComponent;
