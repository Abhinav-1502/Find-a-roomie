// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import RoomPost from '../../models/roomPost';
// import ImageViewer from '../testPages/imageViewer';
// import { Button } from '@mui/material';
// import FiltersBar from '../testPages/FiltersBar';
// import RoomieCard from '../../components/RoomiePosting/RoomieCard';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store';
// import { loadPostList } from '../../redux/slices/PostList';
// import { useNavigate } from 'react-router-dom';


// const ListOfPosts: React.FC = () => {
//   const [roomPosts, setRoomPosts] = useState<RoomPost[]>([]); 
//   const getData = useSelector((state:RootState)=>state.postlist);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/roomposts/`);
//         setRoomPosts(response.data.data);
//         dispatch(loadPostList(response.data.data));
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs once when the component mounts

//   const handlePostOpen = (post: RoomPost) =>{
//     navigate(`/listings/${post.postId}`, { state: { roomPost: post }});
//     console.log(post.postId);
//   } 

//   return (
//     <div>
//     <FiltersBar applyFilters={(filters) => console.log(filters)} />
//     <div className='Listings'>
//       <h1>Room Filters Using Axios</h1>

//       {Array.isArray(roomPosts) ? (
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // This creates a responsive grid layout
//           gap: '20px', // This is the space between grid items
//           padding: '20px' // Optional: adds some padding around the grid
//         }}>
//           {roomPosts.map((room) => (
//             <div key={room.postId} style={{ marginBottom: '20px' }}>
//               <RoomieCard roommate={room}/>
//               {/* ...rest of the code for displaying room details... */}
//             </div>
//           ))}

//       {Array.isArray(getData) ? (
        
//         <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
//         {getData.map((room) => (
//         <div key={room.postId} style={{ marginBottom: '20px' }}>
//             <Button variant="contained" color="secondary" size="medium" onClick={() => handlePostOpen(room)}  sx={{ marginLeft: '1em' }}>
//                     {room.Posttype}
//             </Button>
//             <h2>{room.Posttype}</h2>
//             <p>Name: {room.lookingForRoom.name}</p>
//             <p>Location: {room.lookingForRoom.locationAddress}</p>
//             <p>Description: {room.lookingForRoom.description}</p>
//             {/* Add other properties as needed */}
//             <p>Monthly Rent: {room.pricingAndLeaseDetails.monthlyRent}</p>
//             <p>Utilities Included: {room.pricingAndLeaseDetails.utilitiesIncluded ? 'Yes' : 'No'}</p>
//             {/* Add other properties as needed */}
//             <p>House Types: {room.roomAndPropertyDetails.houseType.join(', ')}</p>
//             <p>Number of Beds: {room.roomAndPropertyDetails.numBeds}</p>
//             {/* Add other properties as needed */}
//             <p>Preferences: {room.preferences.preferences.join(', ')}</p>
//             <p>Contact Email: {room.contactInfo.email}</p>
//             <p>Contact Phone: {room.contactInfo.phone}</p>
//             {/* Add other properties as needed */}
//             <p >Room Photos: <br />
//             {room.photos.map((imageId) => (
//                 <div style={{ height: 400, width: 400, margin: 'auto' }}>
//                 <ImageViewer imageId={imageId} />
//                 </div>
//             ))}
//             </p>

//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ListOfPosts;
