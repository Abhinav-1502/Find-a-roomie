// redux/slices/ListingOptionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListingOptionsState {
  utilities: string[];
  amenities: string[];
  preferences: string[];
}

const initialState: ListingOptionsState = {
  utilities: ['Laundry', 'Heater', 'Hot Water'],
  amenities: ['Swimming Pool', 'Gym', 'Pet-Friendly'],
  preferences: ['No Smoking','No Alcohol', 'Occasional Parties','Indians Preferred', 
                  'All Girl Apartment','All Guys Apartment', 'Mixed Gender Apartment']
};

const listingOptionsSlice = createSlice({
  name: 'listingOptions',
  initialState,
  reducers: {
    addUniqueFeature: (state, action: PayloadAction<string>) => {
      state.utilities.push(action.payload);
    },
    addAmenity: (state, action: PayloadAction<string>) => {
      state.amenities.push(action.payload);
    },
    addPreferences:(state, action: PayloadAction<string>) => {
      state.preferences.push(action.payload);
    }
  },
});

export const { addUniqueFeature, addAmenity, addPreferences } = listingOptionsSlice.actions;
export default listingOptionsSlice.reducer;
