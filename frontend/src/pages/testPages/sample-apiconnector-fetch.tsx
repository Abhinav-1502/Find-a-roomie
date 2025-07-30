// RoomListings.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate, Navigate } from 'react-router-dom';

interface RoomFilter {
  _id: string;
  name: string;
  dateOfCreation: string;
  filterParams: {
    location: string;
    price_range: string;
    amenities: string[];
    lease_duration: string;
    room_size: string;
    pet_policy: string;
    available_from: string;
    _id: string;
  }[];
  __v: number;
}

const RoomFiltersFetch: React.FC = () => {
  const [roomFilters, setRoomFilters] = useState<RoomFilter[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}/roomlistings/filters`)
      .then((response) => response.json())
      .then((data) => setRoomFilters(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleButtonClick = () =>{
    const propsToSend = {
      id: "6577acc6a9b55feb776ba473"
    };
    navigate('/modify-listing-form', { state: propsToSend });
  };

  return (
    <div>
      <div><Button onClick={handleButtonClick}>Test</Button></div>

      <h1>Room Filters Using Fetch</h1>
      {Array.isArray(roomFilters) ? (
        roomFilters.map((filter) => (
          <div key={filter._id} style={{ marginBottom: '20px' }}>
            <h2>{filter.name}</h2>
            <p>Location: {filter.filterParams[0].location}</p>
            <p>Price Range: {filter.filterParams[0].price_range}</p>
            <p>Amenities: {filter.filterParams[0].amenities.join(', ')}</p>
            <p>Lease Duration: {filter.filterParams[0].lease_duration}</p>
            <p>Room Size: {filter.filterParams[0].room_size}</p>
            <p>Pet Policy: {filter.filterParams[0].pet_policy}</p>
            <p>Available From: {filter.filterParams[0].available_from}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoomFiltersFetch;
