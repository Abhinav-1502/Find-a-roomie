// components/CreateListingSteps/Step1Form.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateForm } from '../../redux/slices/CreateListingFormSlice';
import { Button, ButtonGroup, TextField, Grid, Typography, Box } from '@mui/material';

const Step1Form: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form.listingTypeAndLocationInformation);
  const [addressLabel, setAddressLabel] = useState("Address");
  const [descriptionLabel, setDescriptionLabel] = useState("Describe Locality")

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    dispatch(updateForm({ listingTypeAndLocationInformation: { ...formState, [field]: value } }));
    if(field === "listingType" && value==="Roomie"){
      setAddressLabel("Preffered Location (eg: fenway, roxbury)");
      setDescriptionLabel("Describle your preffered locality")
    }else if(field === "listingType"){
      setAddressLabel("Address");
      setDescriptionLabel("Describe Locality")
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">Post Type:</Typography>
          <ButtonGroup variant="contained" color="primary" sx={{ marginLeft: '8px' }}>
            <Button
              onClick={() => handleInputChange('listingType', 'Room')}
              variant={formState.listingType === 'Room' ? 'contained' : 'outlined'}
            >
              Post A Room
            </Button>
            <Button
              onClick={() => handleInputChange('listingType', 'Roomie')}
              variant={formState.listingType === 'Roomie' ? 'contained' : 'outlined'}
            >
              Look For a Room
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      {(formState.listingType==="Room")?(
        <Grid item xs={12}>
        <TextField
          label="Propery Name"
          type="text"
          value={formState.PropertyName}
          onChange={(e) => handleInputChange('PropertyName', e.target.value)}
          fullWidth
        />  
      </Grid>
      ):(null)}
      
      <Grid item xs={12}>
        <TextField
          label={addressLabel}
          type="text"
          value={formState.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          fullWidth
        />
      </Grid>

      {(formState.listingType==="Roomie")?(
        <Grid item xs={12}>
        <TextField
          label="Proximity"
          type="text"
          value={formState.proximity}
          onChange={(e) => handleInputChange('proximity', e.target.value)}
          fullWidth
        />
      </Grid>
      ):(null)}
      

      <Grid item xs={12}>
        <TextField
          label= {descriptionLabel}
          type="text"
          multiline
          rows={3}
          value={formState.locationDescription}
          onChange={(e) => handleInputChange('locationDescription', e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Step1Form;
