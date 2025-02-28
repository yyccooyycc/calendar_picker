import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  movePrev,
  moveNext,
  setCalendarDate,
  setView,
  closeCalendar 
} from '../store/calendarSlice';
import { setFormattedDate } from '../store/dateSlice';
import '../../styles/calendar.scss';
import { 
  getStartOfMonth, 
  getEndOfMonth, 
  getLastDayOfPrevMonth, 
  getStartOfYearRange, 
  isYearInRange 
} from '../utils/dateUtils';

const Calendar = ({ onSelect }) => {
  const { date:dateString, view } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const date = new Date(dateString); 

  const startOfMonth = getStartOfMonth(date);
  const endOfMonth = getEndOfMonth(date);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonthDays = [];
  const currentMonthDays = [];
  const nextMonthDays = [];

  const prevMonthEnd = getLastDayOfPrevMonth(date);
  for (let i = startDay - 1; i >= 0; i--) {
    prevMonthDays.push(prevMonthEnd - i);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  const totalCells = 6*7;
  const remainingDays = totalCells - (prevMonthDays.length + currentMonthDays.length);
  for (let i = 1; i <= remainingDays; i++) {
    nextMonthDays.push(i);
  }

  const handleSelectDate = (day, type) => {
    const newDate = new Date(date);
    if (type === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1, day);
    } else if (type === 'next') {
      newDate.setMonth(newDate.getMonth() + 1, day);
    } else {
      newDate.setDate(day);
    }
    const newDateString = newDate.toISOString();
    const formattedDate = newDateString.split('T')[0];
    dispatch(setCalendarDate(newDateString));
    dispatch(setFormattedDate(formattedDate));
    dispatch(closeCalendar());
    onSelect && onSelect(formattedDate);
  };

  const handleSwitchToMonthView = () => {
    dispatch(setView('month'));}
  const handleSwitchToYearView = () => dispatch(setView('year'));


  const handleSelectMonth = (month) => {
    dispatch(setCalendarDate(new Date(date.getFullYear(), month, 1)));
    dispatch(setView('day'));
  };

  const handleSelectYear = (year) => {
    dispatch(setCalendarDate(new Date(year, 0, 1)));
    dispatch(setView('month'));
  };

  const startYear = getStartOfYearRange(date.getFullYear());
  const titleCalendar =
    view === 'year'
      ? `${startYear}-${startYear+ 9}`
      : view === 'month'
      ? `${date.getFullYear()}`
      : date.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => dispatch(movePrev())}>{'<'}</button>
        <span onClick={view === 'day' ? handleSwitchToMonthView : handleSwitchToYearView}>
          {titleCalendar}
        </span>
        <button onClick={() => dispatch(moveNext())}>{'>'}</button>
      </div>
      {view === 'day' ? (
        <div className="grid day-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
          {prevMonthDays.map((day) => (
            <div key={`prev-${day}`} className="day out-of-range" onClick={() => handleSelectDate(day, 'prev')}>
              {day}
            </div>
          ))}
          {currentMonthDays.map((day) => (
            <div key={`current-${day}`} 
            className={`day ${day === date.getDate() ? 'selected' : ''
              } ${day === new Date().getDate() &&
               date.getMonth() === new Date().getMonth() &&
               date.getFullYear() === new Date().getFullYear() ? 'today': ''}`} 
               onClick={() => handleSelectDate(day, 'current')}>
              {day}
            </div>
          ))}
          {nextMonthDays.map((day) => (
            <div key={`next-${day}`} className="day out-of-range" onClick={() => handleSelectDate(day, 'next')}>
              {day}
            </div>
          ))}
        </div>
      ) : view === 'month' ? (
        <div className="grid month-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} 
            className={`month ${i === date.getMonth() ? 'selected' : ''
              } ${i === new Date().getMonth() && 
               date.getFullYear() === new Date().getFullYear() ? 'today': ''}`} 
            onClick={() => handleSelectMonth(i)}>
              {new Date(0, i).toLocaleString('default', { month: 'short' })}
            </div>
          ))}
        </div>
      ): (
        <div className="grid year-grid">
          {Array.from({ length: 12 }, (_, i) => {
            const year = startYear - 1 + i;
            const isInRange = isYearInRange(year, startYear, startYear + 9);

            return (
            <div 
              key={year} 
              className={`year ${
                year === date.getFullYear() ? 'selected' : ''
              } ${year === new Date().getFullYear() ? 'today' : ''} ${!isInRange ? 'out-of-range' : ''}`} 
               onClick={() => handleSelectYear(year)}>
              {year}
            </div>
          )}
        )}
        </div>
      )}
    </div>
  );
};

export default Calendar;

