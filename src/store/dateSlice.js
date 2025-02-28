import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: { 
    formattedDate: '',
    isDateSelected: false,
   },
  reducers: {
    setFormattedDate: (state, action) => {
      state.formattedDate = action.payload;
      state.isDateSelected = true;
    },
    clearDate: (state) => {
      state.formattedDate = '';
      state.isDateSelected = false;
    },

  },
});

export const { setFormattedDate , clearDate } = dateSlice.actions;
export default dateSlice.reducer;

