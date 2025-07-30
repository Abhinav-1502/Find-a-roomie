// components/CreateListingSteps/Step4Form.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateForm } from '../../redux/slices/CreateListingFormSlice';
import { Typography, ButtonGroup, Button, Grid, Box, TextField, Autocomplete } from '@mui/material';

const Step4Form: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form.houseRulesAndTenantRequirements);
  const preferencesOptions = useSelector((state: RootState)=> state.listOptions.preferences);
  const handleInputChange = (field: keyof typeof formState, value: string | boolean) => {
    dispatch(updateForm({ houseRulesAndTenantRequirements: { ...formState, [field]: value } }));

    
  };

  const handlePreferencesChange = (_event: React.ChangeEvent<{}>, values: string[]) => {
    // Join the selected values into a single string separated by '::'
    const joinedValues = values.join('::');
    handleInputChange('houseOrRoomieRulePreferences', joinedValues);
    //console.log(formState.houseOrRoomieRulePreferences);
  };

  return (
    <Grid container direction={'column'} spacing={2}>
      {/* House Rules Or Roommate Preferences */}
      <Grid item xs>
        <Autocomplete
          multiple
          freeSolo
          sx={{height:"5"}}
          id="preferences"
          options={preferencesOptions}
          value={formState.houseOrRoomieRulePreferences ? formState.houseOrRoomieRulePreferences.split('::') : []}
          onChange={handlePreferencesChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Feel free to add any preferences regarding your roommate or the room"
            />
          )}
        />
        
      </Grid>
       <br />
      {/* Tenant Requirements */}
      <Grid item >
        <TextField
          label="Be More Descriptive (if you want)"
          type="time"
          multiline
          rows={3}
          value={formState.moreDescription}
          onChange={(e) => handleInputChange('moreDescription', e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Step4Form;
