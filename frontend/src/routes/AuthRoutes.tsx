// AuthRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RoomFiltersFetch from '../pages/testPages/sample-apiconnector-fetch';
import RoomFiltersAxios from '../pages/testPages/sample-apiconnector-axios';
import ListOfPosts from '../pages/Listing Page/listing';
import RoomDisplay from '../pages/postDisplay/roomPost';
import CreateListingForm from '../pages/CreateListingPage/CreateListingForm';
import SummaryPage from '../pages/CreateListingPage/SummaryPage';
import EditSummaryPage from '../pages/CreateListingPage/EditSummaryPage';
import BlogPage from '../pages/BlogPage/blogs';
import ImageUpload from '../pages/testPages/imageUpload';
import FilteredMap from '../pages/testPages/mapViewer';
import ChatEntryPage from '../pages/testPages/chatEntry';
import ChatPage from '../pages/testPages/chatComponent';
import ModifyListingForm from '../pages/CreateListingPage/ModifyListingForm';
import MyListings from '../pages/MyListingPage/MyListings';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UserProfile from '../pages/Profile/Profile';


const AuthRoutes: React.FC = () => (
  <Routes>
          {/* Routes that need user to get logged in */}
          <Route path="/fetch" element={<LoggedSession element={<RoomFiltersFetch/>} />} />
          <Route path="/axios" element={<LoggedSession element={<RoomFiltersAxios/>} />} />
          <Route path="/listings" element={<LoggedSession element={<ListOfPosts/>} />} />
          <Route path="/listings/:postId" element={<LoggedSession element={<RoomDisplay/>} />} />
          <Route path="/mylistings" element={<LoggedSession element={<MyListings/>} />} />
          <Route path="/create-listing" element={<LoggedSession element={<CreateListingForm/>} />} />
          <Route path="/summary" element={<LoggedSession element={<SummaryPage/>} />} />
          <Route path="/editsummary" element={<LoggedSession element={<EditSummaryPage/>} />} />
          <Route path='/blogs' element={<LoggedSession element={<BlogPage/>} />} />
          <Route path="/upload" element={<LoggedSession element={<ImageUpload/>} />} />
          <Route path="/map" element={<LoggedSession element={<FilteredMap/>} />} />
          <Route path="/chat" element={<LoggedSession element={<ChatEntryPage/>} />} />
          <Route path="/chat/:roomName/:username" element={<LoggedSession element={<ChatPage/>} />} />
          <Route path="/modify-listing-form" element={<LoggedSession element={<ModifyListingForm/>} />} />
          <Route path="/profile" element={<LoggedSession element={<UserProfile/>} />} />
          
  </Routes>
);

function LoggedSession(props:any) {
  const sessionUser = useSelector((state: RootState) => state.user);
  if(!sessionUser._id){
    return <Navigate to="/login" />;
  }
  return props.element;
}
export default AuthRoutes;
