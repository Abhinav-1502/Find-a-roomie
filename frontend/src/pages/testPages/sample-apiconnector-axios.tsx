import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomPost from '../../models/roomPost';
import ImageViewer from './imageViewer';

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

const RoomFiltersAxios: React.FC = () => {
  const [roomPosts, setRoomPosts] = useState<RoomPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/roomposts/`);
        setRoomPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className='testClass'>
      <h1>Room Filters Using Axios</h1>
      {Array.isArray(roomPosts) ? (
  <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
    {roomPosts.map((room) => (
      <div key={room.postId} style={{ marginBottom: '20px' }}>
        <h2>{room.Posttype}</h2>
        <p>Name: {room.lookingForRoom.name}</p>
        <p>Location: {room.lookingForRoom.locationAddress}</p>
        <p>Description: {room.lookingForRoom.description}</p>
        {/* Add other properties as needed */}
        <p>Monthly Rent: {room.pricingAndLeaseDetails.monthlyRent}</p>
        <p>Utilities Included: {room.pricingAndLeaseDetails.utilitiesIncluded ? 'Yes' : 'No'}</p>
        {/* Add other properties as needed */}
        <p>House Types: {room.roomAndPropertyDetails.houseType.join(', ')}</p>
        <p>Number of Beds: {room.roomAndPropertyDetails.numBeds}</p>
        {/* Add other properties as needed */}
        <p>Preferences: {room.preferences.preferences.join(', ')}</p>
        <p>Contact Email: {room.contactInfo.email}</p>
        <p>Contact Phone: {room.contactInfo.phone}</p>
        {/* Add other properties as needed */}
        <p >Room Photos: <br />
          {room.photos.map((imageId) => (
            <div style={{ height: 400, width: 400, margin: 'auto' }}>
              <ImageViewer imageId={imageId} />
            </div>
          ))}
        </p>
      </div>
    ))}
  </div>
) : (
  <p>Loading...</p>
)}
    </div>
  );
};

export default RoomFiltersAxios;
