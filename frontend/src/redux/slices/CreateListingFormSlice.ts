// redux/slices/CreateListingFormSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ListingTypeAndLocationInformation {
  listingType: string;
  PropertyName: string;
  address: string;
  proximity: string;
  locationDescription: string;
}

interface PricingAndLeaseDetails {
  rent: number;
  utilitiesIncluded: boolean;
  leaseLength: string;
  upfrontFees: string;
}

interface RoomAndPropertyDetails {
  houseType: string,
  beds: string;
  baths: string,
  furnished: string;
  utilities: string;
  sharedAmenities: string;
}

interface HouseRulesAndTenantRequirements {
  houseOrRoomieRulePreferences: string;
  moreDescription: string;
}

interface ContactAndPresentation {
  availability: string;
  email: string;
  phone: string;
  photos: string[];
  
}

interface FormState {
  listingTypeAndLocationInformation: ListingTypeAndLocationInformation;
  pricingAndLeaseDetails: PricingAndLeaseDetails;
  roomAndPropertyDetails: RoomAndPropertyDetails;
  houseRulesAndTenantRequirements: HouseRulesAndTenantRequirements;
  contactAndPresentation: ContactAndPresentation;
}

const initialState: FormState = {
  listingTypeAndLocationInformation: { listingType: '',PropertyName:'', address: '', proximity: '', locationDescription: '' },
  pricingAndLeaseDetails: { rent: 0, utilitiesIncluded: false, leaseLength: '', upfrontFees: '' },
  roomAndPropertyDetails: { houseType:'', beds: '',baths:'', furnished: '', utilities: '',  sharedAmenities: '' },
  houseRulesAndTenantRequirements: { houseOrRoomieRulePreferences:'', moreDescription: '' },
  contactAndPresentation: { availability: '', email: '', photos: [],  phone: '' },
};

// Assuming this is your API endpoint
const API_URL = 'your_api_url';

// Use createAsyncThunk for asynchronous actions
export const submitForm = createAsyncThunk('form/submitForm', async (formData: FormState) => {
  try {
    // Simulate an API call by logging the form data
    console.log('Simulating form submission with data:', formData);

    // Simulate a delay (you can remove this in a real API call)
    const result = await new Promise<{ message: string }>((resolve) => {
      setTimeout(() => {
        // Simulate a successful response
        resolve({ message: 'Form submitted successfully' });
      }, 1000);
    });

    return result;
  } catch (error) {
    // Throw the error to trigger the rejected state
    throw error;
  }
});


const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        // Handle fulfilled state if needed
        console.log('Fulfilled:', action.payload);
      })
      .addCase(submitForm.rejected, (state, action) => {
        // Handle rejected state if needed
        console.error('Rejected:', action.error);
      });
  },
});


export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
