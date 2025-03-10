// components/CreateListingSteps/Step3Form.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateForm } from '../../redux/slices/CreateListingFormSlice';
import { addUniqueFeature } from '../../redux/slices/ListingOptionsSlice';
import { Typography, ButtonGroup, Button, Grid, Box, Autocomplete, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';


const Step3Form: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form.roomAndPropertyDetails);
  const utilitiesOptions = useSelector((state: RootState) => state.listOptions.utilities);
  const sharedAmenitiesOptions = useSelector((state: RootState) => state.listOptions.amenities);

  const listingType = useSelector((state: RootState) => state.form.listingTypeAndLocationInformation.listingType);


  const handleInputChange = (field: keyof typeof formState, value: string) => {
    dispatch(updateForm({ roomAndPropertyDetails: { ...formState, [field]: value } }));
  };

  const handleFurnishedButtonClick = (furnishedType: string) => {
    handleInputChange('furnished', furnishedType);
  };

  const handleHTSelect  = (event:any) =>{
    if(!formState.houseType && event.target.checked){
      handleInputChange('houseType', event.target.value);
    }else{
      const selectedValue = event.target.value;
      const selectedHTs = formState.houseType.split("::");

      if (event.target.checked && !selectedHTs.includes(selectedValue)) {
        // Add the value to the array if the checkbox is checked and not already in the array
        selectedHTs.push(selectedValue);
      } else if (!event.target.checked && selectedHTs.includes(selectedValue)) {
        // Remove the value from the array if the checkbox is unchecked and is in the array
        const index = selectedHTs.indexOf(selectedValue);
        selectedHTs.splice(index, 1);
      }

      // Update the state
      handleInputChange('houseType', selectedHTs.join("::"));
    }
  }

  const handleHTButtonClick = (houseType: string) => {
    handleInputChange('houseType', houseType);
  };

  const handleUtilitiesChange = (_event: React.ChangeEvent<{}>, values: string[]) => {
    // Join the selected values into a single string separated by '::'
    const joinedValues = values.join('::');
    handleInputChange('utilities', joinedValues);
    //console.log(formState.utilities);
  };
  
  const handleAmenitiesChange = (_event: React.ChangeEvent<{}>, values: string[]) => {
    // Join the selected values into a single string separated by '::'
    const joinedValues = values.join('::');
    handleInputChange('sharedAmenities', joinedValues);
  };

  const handleFurnSelect = (event:any) =>{
    if(!formState.furnished && event.target.checked){
      handleInputChange('furnished', event.target.value);
    }else{
      const selectedValue = event.target.value;
      const selectedFurns = formState.furnished.split("::");

      if (event.target.checked && !selectedFurns.includes(selectedValue)) {
        // Add the value to the array if the checkbox is checked and not already in the array
        selectedFurns.push(selectedValue);
      } else if (!event.target.checked && selectedFurns.includes(selectedValue)) {
        // Remove the value from the array if the checkbox is unchecked and is in the array
        const index = selectedFurns.indexOf(selectedValue);
        selectedFurns.splice(index, 1);
      }

      // Update the state
      handleInputChange('furnished', selectedFurns.join("::"));
    }
  }

  return (
    <Grid container spacing={2}>
      {/* House Type */}
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" sx={{ marginRight: '8px' }}>
           {(listingType==="Roomie")?("Preffered"):""} House Type:
          </Typography>
            {(listingType==="Room")?(
               <ButtonGroup variant="contained" color="primary">
               <Button
                 onClick={() => handleHTButtonClick('Apartment')}
                 variant={formState.houseType === 'Apartment' ? 'contained' : 'outlined'}
               >
                 Apartment
               </Button>
               <Button
                 onClick={() => handleHTButtonClick('Town House')}
                 variant={formState.houseType === 'Town House' ? 'contained' : 'outlined'}
               >
                 Town House
               </Button>
               <Button
                 onClick={() => handleHTButtonClick('Condo')}
                 variant={formState.houseType === 'Condo' ? 'contained' : 'outlined'}
               >
                 Condo
               </Button>
             </ButtonGroup>
            ):(
              <FormGroup row>
              <FormControlLabel   control={<Checkbox value="Apartment" onChange={handleHTSelect} />} label="Apartment" />
              <FormControlLabel   control={<Checkbox value="Town House" onChange={handleHTSelect}/>} label="Town House" />
              <FormControlLabel   control={<Checkbox value="Condo" onChange={handleHTSelect}/>} label="Condo" />
              </FormGroup>
            )}
        </Box>
      </Grid>
      
      {/* Room Size */}
      <Grid item xs={12}>
        <TextField
          label= {(listingType==="Room")?("No. of Beds"):("Preffered no. of Beds")}
          type="number"
          value={formState.beds}
          onChange={(e) => handleInputChange('beds', e.target.value)}
          fullWidth
        /> <br />
        </Grid>
        <Grid item xs={12}>
        <TextField
          label={(listingType==="Room")?("No. of Baths"):("Preffered no. of Baths")}
          type="number"
          value={formState.baths}
          fullWidth
          onChange={(e) => handleInputChange('baths', e.target.value)}
          
        />
      </Grid>
      {/* Furnished */}
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" sx={{ marginRight: '8px' }}>
            Furnished:
          </Typography>
            {(listingType==="Room")?(
               <ButtonGroup variant="contained" color="primary">
               <Button
                 onClick={() => handleFurnishedButtonClick('fully')}
                 variant={formState.furnished === 'fully' ? 'contained' : 'outlined'}
               >
                 Fully
               </Button>
               <Button
                 onClick={() => handleFurnishedButtonClick('semi')}
                 variant={formState.furnished === 'semi' ? 'contained' : 'outlined'}
               >
                 Semi
               </Button>
               <Button
                 onClick={() => handleFurnishedButtonClick('unfurnished')}
                 variant={formState.furnished === 'unfurnished' ? 'contained' : 'outlined'}
               >
                 Unfurnished
               </Button>
             </ButtonGroup>
            ):(
              <FormGroup row>
              <FormControlLabel   control={<Checkbox value="fully" onChange={handleFurnSelect} />} label="Fully" />
              <FormControlLabel   control={<Checkbox value="semi" onChange={handleFurnSelect}/>} label="Semi" />
              <FormControlLabel   control={<Checkbox value="unfurnished" onChange={handleFurnSelect}/>} label="Unfurnished" />
              </FormGroup>
            )}
        </Box>
      </Grid>
      {/* Unique Features */}
      <Grid item xs={12}>
        <Autocomplete
          multiple
          freeSolo
          id="utilities"
          options={utilitiesOptions}
          value={formState.utilities ? formState.utilities.split('::') : []}
          onChange={handleUtilitiesChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Utilities"
            />
            
          )}
        />
        
      </Grid>
      {/* Shared Amenities */}
      <Grid item xs={12}>
        <Autocomplete
          multiple
          freeSolo
          id="shared-amenities"
          options={sharedAmenitiesOptions}  // Replace with your shared amenities options
          value={formState.sharedAmenities ? formState.sharedAmenities.split('::') : []}
          onChange={handleAmenitiesChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Amenities"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Step3Form;