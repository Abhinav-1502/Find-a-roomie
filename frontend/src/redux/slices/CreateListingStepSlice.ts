// redux/slices/CreateListingStepSlice.ts

import { createSlice } from '@reduxjs/toolkit';

interface StepState {
  currentStep: number;
}

const initialState: StepState = {
  currentStep: 1,
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    incrementStep: (state) => {
      return { ...state, currentStep: state.currentStep + 1 };
    },
    decrementStep: (state) => {
      return { ...state, currentStep: state.currentStep - 1 };
    },
    resetSteps: () => initialState,
  },
});

export const { incrementStep, decrementStep, resetSteps } = stepSlice.actions;
export default stepSlice.reducer;
