// components/CreateListingSteps/Step2Form.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateForm } from '../../redux/slices/CreateListingFormSlice';
import { Typography, TextField, Button, Grid, ButtonGroup, Box } from '@mui/material';

const Step2Form: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form.pricingAndLeaseDetails);

  
  const listingType = useSelector((state: RootState) => state.form.listingTypeAndLocationInformation.listingType);

  const getDefaultEndDate = (): string => {
    const defaultEndDate = new Date();
    defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 2);
    return defaultEndDate.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());
  const [customLease, setCustomLease] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string>('');

  useEffect(() => {
    // Update end date when start date changes
    if (!customLease && selectedDuration) {
      setEndDate(calculateEndDate(startDate, selectedDuration));
      dispatch(
        updateForm({
          pricingAndLeaseDetails: { ...formState, leaseLength: `${startDate} to ${calculateEndDate(startDate, selectedDuration)}` },
        })
      );
    }
  }, [startDate, selectedDuration, customLease, formState.leaseLength, dispatch]);

  const handleInputChange = (field: keyof typeof formState, value: string | boolean) => {
    dispatch(updateForm({ pricingAndLeaseDetails: { ...formState, [field]: value } }));
  };

  const handleLeaseDurationChange = (duration: string) => {
    if (duration === 'custom') {
      setCustomLease(true);
      setEndDate(getDefaultEndDate());
      setSelectedDuration(duration);
    } else {
      setCustomLease(false);
      setEndDate(calculateEndDate(startDate, duration));
      setSelectedDuration(duration);
      dispatch(
        updateForm({
          pricingAndLeaseDetails: { ...formState, leaseLength: `${startDate} to ${calculateEndDate(startDate, duration)}` },
        })
      );
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (!customLease && selectedDuration) {
      setEndDate(calculateEndDate(value, selectedDuration));
      dispatch(
        updateForm({
          pricingAndLeaseDetails: { ...formState, leaseLength: `${value} to ${calculateEndDate(value, selectedDuration)}` },
        })
      );
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    dispatch(updateForm({ pricingAndLeaseDetails: { ...formState, leaseLength: `${startDate} to ${value}` } }));
  };

  const calculateEndDate = (startDate: string, duration: string): string => {
    const endDate = new Date(startDate);
    switch (duration) {
      case '3 months':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case '6 months':
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case '12 months':
        endDate.setMonth(endDate.getMonth() + 12);
        break;
      default:
        // Default to 6 months for custom duration or adjust as needed
        endDate.setMonth(endDate.getMonth() + 6);
        break;
    }
    return endDate.toISOString().split('T')[0];
  };

  return (
    <Grid container spacing={2}>
      {/* Monthly Rent or Price */}
      <Grid item xs={12}>
        <TextField
          label={(listingType==="Room")?("Monthly Rent"):("Preferred Per Month Rent")}
          type="text"
          value={formState.rent.toString()}
          onChange={(e) => handleInputChange('rent', e.target.value)}
          fullWidth
        />
      </Grid>

      
      {/* Utilities Included */}
      {(listingType==="Room")?(
      <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle1" sx={{ marginRight: '8px' }}>
          Utilities Included:
        </Typography>
        <ButtonGroup variant="contained" color="primary" >
          <Button
            onClick={() => handleInputChange('utilitiesIncluded', true)}
            variant={formState.utilitiesIncluded ? 'contained' : 'outlined'}
          >
            Yes
          </Button>
          <Button
            onClick={() => handleInputChange('utilitiesIncluded', false)}
            variant={!formState.utilitiesIncluded ? 'contained' : 'outlined'}
          >
            No
          </Button>
        </ButtonGroup>
      </Box>
    </Grid>
      ):(null)}
      
      {/* Start Date */}
      <Grid item xs={3}>
        <TextField
          label="Ready to move in from?"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          fullWidth
        />
      </Grid>
      {/* Lease Duration Typography */}
      <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
          Lease Duration: 
        </Typography>
        <ButtonGroup  sx={{ marginLeft: '16px' }}>
          <Button
            onClick={() => handleLeaseDurationChange('3 months')}
            variant={selectedDuration === '3 months' ? 'contained' : 'outlined'}
          >
            3 Months
          </Button>
          <Button
            onClick={() => handleLeaseDurationChange('6 months')}
            variant={selectedDuration === '6 months' ? 'contained' : 'outlined'}
          >
            6 Months
          </Button>
          <Button
            onClick={() => handleLeaseDurationChange('12 months')}
            variant={selectedDuration === '12 months' ? 'contained' : 'outlined'}
          >
            12 Months
          </Button>
          <Button 
            onClick={() => handleLeaseDurationChange('custom')}
            variant={selectedDuration === 'custom' ? 'contained' : 'outlined'}
          >
            Custom
          </Button>
        </ButtonGroup>
      </Box>
      </Grid>
      {/* Custom End Date (if 'Custom' is selected) */}
      {customLease && (
        <>
          <Grid item xs={3}>
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              fullWidth
            />
          </Grid>
        </>
      )}
      {/* Security Deposit or Upfront Fees */}
      {(listingType==="Room")?(
        <Grid item xs={12}>
        <TextField
          label="Security Deposit or Upfront Fees"
          type="text"
          value={formState.upfrontFees}
          onChange={(e) => handleInputChange('upfrontFees', e.target.value)}
          fullWidth
        />
      </Grid>
      ):(null)}
      
    </Grid>
  );
};

export default Step2Form;
