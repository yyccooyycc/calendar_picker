import React from 'react';
import DatePicker from './components/datePicker.js';
import '../styles/calendar.scss';
import '../styles/date-picker.scss'
const App = () => {
  return (
    <div className="app-container">
      <h1>Calendar and DatePicker App</h1>
      <DatePicker />
    </div>
  );
};

export default App;