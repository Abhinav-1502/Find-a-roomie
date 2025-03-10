import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomPost from '../../models/roomPost';
import ImageViewer from '../testPages/imageViewer';
import { Button } from '@mui/material';
import FiltersBar from '../testPages/FiltersBar';
import RoomieCard from '../../components/RoomiePosting/RoomieCard';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { loadPostList } from '../../redux/slices/PostList';
import './listing.css'
import { error } from 'console';
import ListPosts from './ListPosts';
import GridPosts from './GridPosts';
import MapPosts from './MapPosts';

const ListOfPosts: React.FC = () => {
  const [roomPosts, setRoomPosts] = useState<RoomPost[]>([]); 
  const getData = useSelector((state:RootState)=>state.postlist);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({});
  const [filteredRoomPosts, setFilteredRoomPosts] = useState<RoomPost[]>([]); // Added filteredRoomPosts state
  const [finalPosts, setFinalPosts] = useState<RoomPost[]>(getData); // Use finalPosts state
  const [viewType, setViewType] = useState<'list' | 'map' | 'grid'>('list'); // Added viewType state

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/roomposts/`);
        setRoomPosts(response.data.data);
        dispatch(loadPostList(response.data.data));
        setFinalPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handlePostFilters = (filters: any) => {
    //console.log('Applying filters:', filters);
    //console.log('roomPosts:', roomPosts);
    // Apply filters to the original list and update the filteredRoomPosts state
    const filteredPosts = roomPosts.filter((post) => {
      // Handle post type filter
      if (filters.postType && filters.postType.length > 0 && !filters.postType.includes(post.Posttype)) {
        return false;
      }
      
      // Handle price range filter
      if (filters.priceRange) {
        const lowerLimit = parseInt(filters.priceRange[0]);
        const upperLimit = parseInt(filters.priceRange[1]);
        const monthlyRent = parseInt(post.pricingAndLeaseDetails.monthlyRent);
  
        if (monthlyRent < lowerLimit || monthlyRent > upperLimit) {
          return false;
        }
      }
  
      // Handle move-in date filter
      if (filters.moveInDate) {
        const startDate = new Date(filters.moveInDate);
        const leaseStartDate = new Date(post.pricingAndLeaseDetails.leaseDuration.split(' to ')[0]);
        //console.log('moveInDate:', startDate);
        //console.log('post.pricingAndLeaseDetails.leaseDuration:', leaseStartDate);
        // Check if move-in date is within the last 10 days before the lease start date
        const tenDaysBeforeLeaseStart = new Date(leaseStartDate);
        tenDaysBeforeLeaseStart.setDate(tenDaysBeforeLeaseStart.getDate() - 10);
  
        if (startDate <= tenDaysBeforeLeaseStart) {
          return false;
        }
      }
      
      // Handle house type filter
      if (filters.houseType && filters.houseType.length > 0) {
        const postHouseTypes = post.roomAndPropertyDetails.houseType.map(type => type);
        if (!postHouseTypes.some(type => filters.houseType.includes(type))) {
          return false;
        }
      }
      // Handle furnished type filter
      if (filters.furnished && filters.furnished.length > 0) {
        const postFurnishings = post.roomAndPropertyDetails.furnished.map(furnishing => furnishing);
        if (!postFurnishings.some(furnishing => filters.furnished.includes(furnishing))) {
          return false;
        }
      }

      // Handle utilities filter
      if (filters.utilities && filters.utilities.length > 0) {
        const postUtilities = post.roomAndPropertyDetails.utilities.map(utility => utility);
        if (!postUtilities.some(utility => filters.utilities.includes(utility))) {
          return false;
        }
      }

      // Handle amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const postAmenities = post.roomAndPropertyDetails.amenities.map(amenity => amenity);
        if (!postAmenities.some(amenity => filters.amenities.includes(amenity))) {
          return false;
        }
      }
  
      // Handle preferences filter
      if (filters.preferences && filters.preferences.length > 0) {
        const postPreferences = post.preferences.preferences.map(preference => preference);
        if (!postPreferences.some(preference => filters.preferences.includes(preference))) {
          return false;
        }
      }
      
  
      // If none of the filters excluded the post, include it in the filtered list
      return true;
    });
    console.log(filteredPosts);


    const sortedPostsByPrice = filteredPosts.slice().sort((a, b) => {
      const rentA = parseInt(a.pricingAndLeaseDetails.monthlyRent);
      const rentB = parseInt(b.pricingAndLeaseDetails.monthlyRent);
    
      return filters.sortBy === 'costly' ?
        (filters.sortOrder === 'asc' ? rentB - rentA : rentA - rentB) :
        (filters.sortOrder === 'asc' ? rentA - rentB : rentB - rentA);
    });
    console.log(sortedPostsByPrice);
    const sortedPostsByName = sortedPostsByPrice.slice().sort((a, b) => {
      // Sorting logic based on filters.sortBy
      if (filters.sortBy === 'alphabetical') {
        const nameA = a.lookingForRoom.name.toUpperCase();
        const nameB = b.lookingForRoom.name.toUpperCase();
    
        return filters.sortOrder === 'asc' ?
          nameA.localeCompare(nameB) :
          nameB.localeCompare(nameA);
      }
    
      // Default case, no sorting
      return 0;
    });
    
    
    setFinalPosts(sortedPostsByName); // Update finalPosts with the filtered and sorted data
    console.log(sortedPostsByName);
    console.log(sortedPostsByName.length);
    
  };

  const handleViewTypeChange = (type: 'list' | 'map' | 'grid') => {
    setViewType(type);
  };

  const handlePostOpen = (post: RoomPost) =>{
    navigate(`/listings/${post.postId}`, { state: { roomPost: post }});
    console.log(post.postId);
  } 
 
  return (
    <div className='Listings'>
      <FiltersBar applyFilters={(filters) => {handlePostFilters(filters)}} />
      <div className="view-options" style={{ padding: '20px' }}>
        <Button onClick={() => handleViewTypeChange('list')} variant={viewType === 'list' ? 'contained' : 'outlined'}>
          List View
        </Button>
        <Button onClick={() => handleViewTypeChange('grid')} variant={viewType === 'grid' ? 'contained' : 'outlined'}>
          Grid View
        </Button>
        <Button onClick={() => handleViewTypeChange('map')} variant={viewType === 'map' ? 'contained' : 'outlined'}>
          Map View
        </Button>
      </div>
      {viewType === "list" && <ListPosts posts={finalPosts} handlePostOpen={handlePostOpen} />}
      {viewType === "grid" && <GridPosts posts={finalPosts} handlePostOpen={handlePostOpen}/>}
      {viewType === "map" && <MapPosts posts={finalPosts} handlePostOpen={handlePostOpen}/>}
    </div>
  );
};
 
export default ListOfPosts;
 