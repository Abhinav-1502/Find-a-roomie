// pages/CreateListingPage/ModifyListingForm.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementStep, decrementStep } from '../../redux/slices/CreateListingStepSlice';
import { RootState } from '../../redux/store';
import { Button, Stepper, Step, StepLabel, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateForm } from '../../redux/slices/CreateListingFormSlice';
import './common.css'


// Import your step components
import Step1 from '../../components/CreateListingSteps/step1Form';
import Step2 from '../../components/CreateListingSteps/step2Form';
import Step3 from '../../components/CreateListingSteps/step3Form';
import Step4 from '../../components/CreateListingSteps/step4Form';
import Step5 from '../../components/CreateListingSteps/step5Form';

const steps = ["Location Information", "Pricing and Lease Details", "Room and Property Details", "House Rules and Tenant Requirements", "Contact Info"]; // Update the step labels

const StepForm: React.FC = () => {
  const sessionUser = useSelector((state: RootState)=> state.user);
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.currentStep);
  const formData = useSelector((state: RootState) => state.form); // Assuming `form` is the slice holding your form data
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const location = useLocation();
  const receivedProps = location.state; // Replace YourPropsType with the actual type/interface of your props
  
  useEffect(() => {
    console.log("Prods id:");
    console.log(receivedProps.id);
    // Fetch room data by ID when the component mounts
    if (receivedProps && receivedProps.id) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/roomposts`)
        .then((response) => response.json())
        .then((data) => {
          const roomData = data.data.find((room: any) => room._id === receivedProps.id);
          if (roomData) {
            console.log(roomData);
            dispatch(updateForm(convertRoomDataToFormData(roomData)));
            console.log(formData);
          }
        })
        .catch((error) => console.error('Error fetching room data:', error));
    }
  }, [receivedProps]);

  const convertRoomDataToFormData = (roomData: any): any => {
    const isRoom = roomData.Posttype === "Room";
    let nameForData = `${sessionUser.firstName}` + " " + `${sessionUser.lastName}`;
    if (isRoom) {
      nameForData = roomData.lookingForRoom.name;
    }
  
    const formData: any = {
      listingTypeAndLocationInformation: {
        listingType: roomData.Posttype,
        PropertyName: isRoom ? roomData.lookingForRoom.name : "",
        address: roomData.lookingForRoom.locationAddress,
        proximity: roomData.lookingForRoom.proximity,
        locationDescription: roomData.lookingForRoom.description,
      },
      pricingAndLeaseDetails: {
        rent: roomData.pricingAndLeaseDetails.monthlyRent,
        utilitiesIncluded: roomData.pricingAndLeaseDetails.utilitiesIncluded,
        leaseLength: roomData.pricingAndLeaseDetails.leaseDuration,
        upfrontFees: "", // You might need to update this based on your data
      },
      roomAndPropertyDetails: {
        houseType: roomData.roomAndPropertyDetails.houseType.join("::"), // Assuming houseType is an array
        beds: roomData.roomAndPropertyDetails.numBeds,
        baths: roomData.roomAndPropertyDetails.numBaths,
        furnished: roomData.roomAndPropertyDetails.furnished.join("::"), // Assuming furnished is an array
        utilities: roomData.roomAndPropertyDetails.utilities.join("::"), // Assuming utilities is an array
        sharedAmenities: roomData.roomAndPropertyDetails.amenities.join("::"), // Assuming amenities is an array
      },
      houseRulesAndTenantRequirements: {
        houseOrRoomieRulePreferences: roomData.preferences.preferences.join("::"), // Assuming preferences is an array
        moreDescription: roomData.preferences.moreDescription,
      },
      contactAndPresentation: {
        availability: roomData.contactInfo.contactAvailability,
        email: roomData.contactInfo.email,
        phone: roomData.contactInfo.phone,
        photos: roomData.photos,
      },
    };
  
    return formData;
  };
  

  const handleNext = () => {
    if (step < steps.length) {
        dispatch(incrementStep());
      } else {
        const propsToSend = {
          id: receivedProps.id
        };
        // If it's the last step, navigate to the summary page
        navigate('/editSummary', {state: propsToSend});
      }
    console.log(formData)
  };

  const handlePrev = () => {
    dispatch(decrementStep());
  };

  return (
      <Paper className='formPaper' elevation={3}>
        <Typography sx={{textAlign: 'center', marginBottom: 5}} variant='h3'>
          Edit your listing 
        </Typography>
        
      <Grid className='formGrid'  container spacing={3}>
      <Grid item xs={3}>
      <Stepper activeStep={step - 1} orientation="vertical" sx={{ minWidth: '200px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflowY: 'auto', minHeight: 0 }}>
        <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflowY: 'auto', height: '350px',  padding: '8px', scrollbarWidth: 'thin', scrollbarColor: '#888 transparent' , '&::-webkit-scrollbar-thumb': { background: '#888' } }}>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <Step5 />}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button
            disabled={step === 1}
            onClick={handlePrev}
            style={{ alignSelf: 'flex-start' }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={{ alignSelf: 'flex-end' }}
          >
            Next
            {/* step < steps.length ? 'Next' : 'Submit' */}
          </Button>
        </div>
      </Grid>
    </Grid>
      </Paper>
      
    
  );
};

export default StepForm;
