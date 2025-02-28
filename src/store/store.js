import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import dateReducer from './dateSlice';

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    date: dateReducer,
  },
});

export default store;
