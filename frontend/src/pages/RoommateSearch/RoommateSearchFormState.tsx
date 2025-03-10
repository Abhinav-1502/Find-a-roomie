import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';

interface RoomListing {
  address: string;
  propertyType: string;
  rent: number;
  billsIncluded: boolean;
  securityDeposit: number;
  availableFrom: string;
  preferredGender: string;
  bathroomType: string;
  amenities: string[];
}

export default function RoomListingForm() {
  const [roomListing, setRoomListing] = useState<RoomListing>({
    address: '',
    propertyType: '',
    rent: 0,
    billsIncluded: false,
    securityDeposit: 0,
    availableFrom: '',
    preferredGender: '',
    bathroomType: '',
    amenities: []
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
    setRoomListing({
      ...roomListing,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAmenitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setRoomListing({
      ...roomListing,
      amenities: checked
        ? [...roomListing.amenities, value]
        : roomListing.amenities.filter(amenity => amenity !== value)
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit logic here
    console.log(roomListing);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>Create Your Room Listing</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Property Address"
          name="address"
          value={roomListing.address}
          onChange={handleChange}
          margin="normal"
        />
        {/* Add other fields like propertyType, rent, etc. */}

        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={roomListing.billsIncluded} onChange={handleChange} name="billsIncluded" />}
            label="Bills Included"
          />
          {/* Add other amenities checkboxes */}
        </FormGroup>

        <Button type="submit" variant="contained" color="primary">
          Create Room
        </Button>
      </form>
    </Container>
  );
}
