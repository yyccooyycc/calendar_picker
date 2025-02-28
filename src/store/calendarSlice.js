import { createSlice } from '@reduxjs/toolkit';
import { getAdjacentMonth, getAdjacentYear } from '../utils/dateUtils';

const initialState = {
  date: new Date().toISOString(),
  view: 'day',
  isCalendarOpen: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendarDate: (state, action) => {
      const inputDate = action.payload;
      const parsedDate = new Date(inputDate);
      if (parsedDate instanceof Date && !isNaN(parsedDate)) {
        state.date = parsedDate.toISOString(); // 確保存儲為 ISO 格式
      } else {
        console.error('Invalid date passed to setCalendarDate:', inputDate);
      }
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    movePrev: (state) => {
      const currentDate = new Date(state.date);
      if (state.view === 'day') {
        state.date = getAdjacentMonth(currentDate, -1);
      } else if (state.view === 'month') {
        state.date = getAdjacentYear(currentDate, -1);
      }else if (state.view === 'year') {
        state.date = getAdjacentYear(currentDate, -1);
      }
    },
    moveNext: (state) => {
      const currentDate = new Date(state.date);
      if (state.view === 'day') {
        state.date =getAdjacentMonth(currentDate, 1);
      } else if (state.view === 'month') {
        state.date = getAdjacentYear(currentDate, 1);
      }else if (state.view === 'year') {
        state.date = getAdjacentYear(currentDate, 1);
      }
    },
    toggleCalendar: (state) => {
      state.isCalendarOpen = !state.isCalendarOpen;
    },
    closeCalendar: (state) => {
      state.isCalendarOpen = false;
    }
  },
});

export const { setCalendarDate, setView, movePrev, moveNext, toggleCalendar, closeCalendar  } = calendarSlice.actions;
export default calendarSlice.reducer;


