// DatePickerComponent.js
import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const DatePickerComponent = ({ selectedDate, setSelectedDate, darkMode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DateTimePicker']}>
      <DateTimePicker
        label="Enter date & time"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: darkMode ? 'black' : 'white',
            color: darkMode ? 'white' : 'black',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: darkMode ? 'gray' : 'black',
          },
          '& .MuiInputLabel-root': {
            color: darkMode ? 'white' : 'black',
          },
          '& .MuiSvgIcon-root': {
            color: darkMode ? 'white' : 'black',
          },
        }}
      />
    </DemoContainer>
  </LocalizationProvider>
);

export default DatePickerComponent;
