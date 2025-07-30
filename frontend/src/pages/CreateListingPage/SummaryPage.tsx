// components/CreateListingSteps/SummaryPage.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Paper, Button, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { submitForm } from '../../redux/slices/CreateListingFormSlice';
import { useNavigate } from 'react-router-dom';
import './summary.css';
import axios from 'axios';
import { error } from 'console';
import { useAlert } from '../../handlers/AlertProvider';

const SummaryPage: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);
  const sessionUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showAlert} = useAlert();
  const listingType = useSelector((state: RootState) => state.form.listingTypeAndLocationInformation.listingType);


  const handleBack = () => {
    navigate('/create-listing');  
  };

  const checkFields = ():Boolean =>{
    if(!formData.listingTypeAndLocationInformation.listingType ||
      !formData.listingTypeAndLocationInformation.address ||
      !formData.listingTypeAndLocationInformation.locationDescription||
      !formData.pricingAndLeaseDetails.rent ||
      !formData.pricingAndLeaseDetails.leaseLength ||
      !formData.roomAndPropertyDetails.baths ||
      !formData.roomAndPropertyDetails.beds ||
      !formData.roomAndPropertyDetails.furnished ||
      !formData.roomAndPropertyDetails.houseType ||
      !formData.roomAndPropertyDetails.sharedAmenities ||
      !formData.roomAndPropertyDetails.utilities ||
      !formData.houseRulesAndTenantRequirements.houseOrRoomieRulePreferences  ||
      !formData.contactAndPresentation.availability ||
      !formData.contactAndPresentation.email ||
      !formData.contactAndPresentation.phone ||
      !formData.contactAndPresentation.photos){
        return false;
      }
      return true;
  }
  const stringToList = (stringData: String):Array<String> =>{
    const list = stringData.split("::");
    return list;
  }
  const getData = ():any => {
    const isRoom = formData.listingTypeAndLocationInformation.listingType==="Room";
    let nameForData = `${sessionUser.firstName}`+" "+`${sessionUser.lastName}`;
    if(isRoom){
      nameForData = formData.listingTypeAndLocationInformation.PropertyName;
    }
    const data = {
      Posttype: formData.listingTypeAndLocationInformation.listingType,
      postId: `${formData.listingTypeAndLocationInformation.listingType}`+`${sessionUser.userId}`+`${sessionUser.postedList.length+1}`,
      userId: sessionUser.userId,
      lookingForRoom: {
        name: nameForData,
        locationAddress: formData.listingTypeAndLocationInformation.address,
        proximity: formData.listingTypeAndLocationInformation.proximity,
        description: formData.listingTypeAndLocationInformation.locationDescription
      },
      pricingAndLeaseDetails:{
        monthlyRent: formData.pricingAndLeaseDetails.rent,
        utilitiesIncluded: formData.pricingAndLeaseDetails.utilitiesIncluded,
        leaseDuration: formData.pricingAndLeaseDetails.leaseLength
        // securityDeposit: formData.pricingAndLeaseDetails.upfrontFees
      },
      roomAndPropertyDetails: {
        houseType: stringToList(formData.roomAndPropertyDetails.houseType),
        numBeds: formData.roomAndPropertyDetails.beds,
        numBaths: formData.roomAndPropertyDetails.beds,
        furnished: stringToList(formData.roomAndPropertyDetails.furnished),
        utilities: stringToList(formData.roomAndPropertyDetails.utilities),
        amenities: stringToList(formData.roomAndPropertyDetails.sharedAmenities)
      },
      preferences: {
        preferences: stringToList(formData.houseRulesAndTenantRequirements.houseOrRoomieRulePreferences),
        moreDescription: formData.houseRulesAndTenantRequirements.moreDescription
      },
      contactInfo: {
        contactAvailability: formData.contactAndPresentation.availability,
        email: formData.contactAndPresentation.email,
        phone: formData.contactAndPresentation.phone
      },
      photos: formData.contactAndPresentation.photos
    };
    console.log(data);
    // data.lookingForRoom
    return data;
  }

  const addPostToUserDB = (postId: string) =>{
    const apiPutData = {
      userId: sessionUser.userId,
      postId: postId
    };
    const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api/users/api/addPost`;
    axios.put(apiURL, apiPutData)
      .then((response)=>{
        console.log(response.data.message);
        sessionUser.postedList.push(postId);
      })
      .catch((error)=>{
        console.log(error.response);
      })
  }

  const handleSubmit = async () => {

    if(checkFields()){
        const apiPostData = getData();
        const apiURL = `${process.env.REACT_APP_API_BASE_URL}/roomposts/`;
        axios
          .post(apiURL, apiPostData)
          .then((response)=>{
              showAlert('success', "Post Added Successfully");
              addPostToUserDB(apiPostData.postId);
              console.log(response.data.message);
              navigate('/listings');
            })
          .catch((error)=>{
            showAlert('error', error.response.data.message);
            console.log(error.response);
          })
    }else{
      showAlert('warning', "Please enter all the fields");
    }
  };

  const renderAccordion = (title: string, content: React.ReactNode) => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title.toLowerCase()}-content`} id={`${title.toLowerCase()}-header`}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Grid className='summaryGrid' container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{textAlign:'left'}} className='formPaper' elevation={3} style={{ padding: '16px' }}>
          <Typography textAlign={'center'} variant="h4">Summary</Typography>

          {renderAccordion("Location Information", (
            <Typography>
              {(listingType==="Room")?(
                 `Property Name: ${formData.listingTypeAndLocationInformation.PropertyName}`
              ):(null)}
              Address: {formData.listingTypeAndLocationInformation.address}<br />
              Proximity: {formData.listingTypeAndLocationInformation.proximity}<br />
              Safety Features: {formData.listingTypeAndLocationInformation.locationDescription}
            </Typography>
          ))}

          {renderAccordion("Pricing and Lease Details", (
            <Typography>
              Rent: ${formData.pricingAndLeaseDetails.rent}<br />
              Utilities Included: {formData.pricingAndLeaseDetails.utilitiesIncluded ? 'Yes' : 'No'}<br />
              Lease Length: {formData.pricingAndLeaseDetails.leaseLength}<br />
              Upfront Fees: {formData.pricingAndLeaseDetails.upfrontFees}
            </Typography>
          ))}

          {renderAccordion("Room and Property Details", (
            <Typography>
              {(listingType==="Roomie")?(`Preffered Room:`):(null)} <br />
              House Type: {formData.roomAndPropertyDetails.houseType}
              Total Beds: {formData.roomAndPropertyDetails.beds}<br />
              Total Baths: {formData.roomAndPropertyDetails.baths}<br />
              Furnished: {formData.roomAndPropertyDetails.furnished}<br />
              Unique Features: {formData.roomAndPropertyDetails.utilities}<br />
              Shared Amenities: {formData.roomAndPropertyDetails.sharedAmenities}
            </Typography>
          ))}

          {renderAccordion("House Rules and Tenant Requirements", (
            <Typography>
              Roommate or House Preferences: {formData.houseRulesAndTenantRequirements.houseOrRoomieRulePreferences}<br />
              More Description : {formData.houseRulesAndTenantRequirements. moreDescription}<br />
            </Typography>
          ))}

          {renderAccordion("Contact and Presentation", (
            <Typography>
              Availability: {formData.contactAndPresentation.availability}<br />
              Email: {formData.contactAndPresentation.email}<br />
              Phone: {formData.contactAndPresentation.phone}
            </Typography>
          ))}

          <Divider style={{ margin: '16px 0' }} />

          <Grid container justifyContent="space-between">
            <Grid item>
              <Button variant="contained" onClick={handleBack}>Back</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Grid>
          </Grid>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default SummaryPage;
