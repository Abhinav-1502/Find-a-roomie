import React from 'react';
import MapComponent from './AddressMap';
import 'leaflet/dist/leaflet.css';
import RoomPost from '../../models/roomPost';

interface FilteredMapProps {
  posts: RoomPost[];
  handlePostOpen: (post: RoomPost) => void;
}

const FilteredMap: React.FC<FilteredMapProps> = ({ posts, handlePostOpen }) => {
  const addresses = posts.map(post => post.lookingForRoom.locationAddress ? post.lookingForRoom.locationAddress : "Boston, MA");
  console.log(addresses);
  return (
    <div>
    <MapComponent
  addresses={[
    'Northeastern University, 360 Huntington Ave, Boston, MA 02115',
    '1 Infinite Loop, Cupertino, CA']}
  posts={posts.slice(-2)}
      handlePostOpen={handlePostOpen}
    />
    </div>
  );
};

export default FilteredMap;
