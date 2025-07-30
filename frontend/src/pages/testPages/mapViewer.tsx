// FilteredMap.jsx
import React from 'react';
import MapComponent from './AddressMap';
import 'leaflet/dist/leaflet.css';

const FilteredMap: React.FC = () => {
  const addresses = [
    'Northeastern University, 360 Huntington Ave, Boston, MA 02115',
    '1 Infinite Loop, Cupertino, CA',
    '335, South Huntington Avenue, Jamaica Plain, Boston, Suffolk County, Massachusetts, 02130, United States',
    'boston'
    // Add more addresses as needed
  ];

  return (
    <div>
      <h1>Map with Addresses in Radius</h1>
      <h1>test</h1>
      <h1>test</h1>
      <h1>test</h1>
      <MapComponent  addresses={addresses} />
    </div>
  );
};

export default FilteredMap;
