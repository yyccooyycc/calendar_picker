import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './Calendar';
import { toggleCalendar,closeCalendar, setCalendarDate } from '../store/calendarSlice';
import '../../styles/date-picker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const DatePicker = () => {
  const { formattedDate, isDateSelected } = useSelector((state) => state.date);
  const { isCalendarOpen } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (isValidDate(inputDate)) {
      dispatch(setCalendarDate(inputDate));
    } else {
      console.error("wrong format. Use YYYY-MM-DD.");
    }
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    dispatch(setCalendarDate(formattedDate));
    dispatch(closeCalendar());
  };

  const toggleCalendarDisplay = () => dispatch(toggleCalendar());

  return (
    <div className="date-picker">
      <div className="input-container">
        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
        <input
          type="text"
          value={isDateSelected ? formattedDate : ""}
          onChange={handleDateChange}
          onFocus={toggleCalendarDisplay}
          placeholder="YYYY-MM-DD"
        />
      </div>
      {isCalendarOpen && (
        <div className="calendar-dropdown">
          <Calendar onSelect={(date) => handleDateSelect(new Date(date))} />
        </div>
      )}
    </div>
  );
};

const isValidDate = (dateString) => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRegex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export default DatePicker;

