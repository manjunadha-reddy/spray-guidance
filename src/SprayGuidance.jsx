// SprayGuidance.js
import React, { useState } from 'react';
import Header from './components/Header';
import DatePickerComponent from './components/DatePickerComponent';
import ForecastGrid from './components/ForecastGrid';
import Footer from './components/Footer';
import dayjs from 'dayjs';

const SprayGuidance = () => {
  const [sprayData, setSprayData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isForecastReady, setIsForecastReady] = useState(false);

  const minDate = dayjs();
  const maxDate = dayjs().add(7, 'day'); 

  const generateSprayData = (startDate) => {
    const start = startDate.toDate();
    const data = Array.from({ length: 36 }, (_, i) => {
      const futureDate = new Date(start.getTime() + i * 60 * 60 * 1000);
      return {
        hour: futureDate.toLocaleTimeString([], { hour: '2-digit', hour12: true }),
        date: futureDate.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        guidance: Math.floor(Math.random() * 4),
      };
    });
    setSprayData(data);
  };

  const handleGenerateForecast = () => {
    if (selectedDate && selectedDate.isAfter(minDate) && selectedDate.isBefore(maxDate)) {
      generateSprayData(selectedDate);
      setIsForecastReady(true);
    }
  };

  const isDateInRange = selectedDate && selectedDate.isAfter(minDate) && selectedDate.isBefore(maxDate);
  const validationMessage = !isDateInRange && selectedDate ? 
    `Please select a date within the range: ${minDate.format('MM/DD/YYYY')} - ${maxDate.format('MM/DD/YYYY')}.` 
    : '';

  const getGuidanceColor = (guidance) => {
    switch (guidance) {
      case 0:
        return darkMode ? 'bg-red-600 border-red-400 text-white' : 'bg-red-200 border-red-300 text-red-600';
      case 1:
        return darkMode ? 'bg-yellow-500 border-yellow-400 text-white' : 'bg-yellow-200 border-yellow-300 text-yellow-600';
      case 2:
        return darkMode ? 'bg-green-500 border-green-400 text-white' : 'bg-green-200 border-green-300 text-green-600';
      default:
        return darkMode ? 'bg-gray-700 border-gray-500 text-white ' : 'bg-gray-200 border-gray-300 text-gray-600';
    }
  };

  const getGuidanceText = (guidance) => {
    switch (guidance) {
      case 0:
        return 'Do not spray';
      case 1:
        return 'Spray with caution';
      case 2:
        return 'Safe to spray';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen flex flex-col`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="py-10 px-6 max-w-6xl mx-auto flex flex-col items-center flex-grow">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wider">36-Hour Spray Guidance</h1>
          <p className="text-lg mt-4">Select a date and time to start the forecast</p>
        </div>

        {validationMessage && (
          <p className="text-red-600 mt-2 text-sm">
            {validationMessage}
          </p>
        )}

        <div className="mt-6 flex flex-col items-center">
          <DatePickerComponent selectedDate={selectedDate} 
              setSelectedDate={(date) => { setSelectedDate(date); setIsForecastReady(false); }} 
              darkMode={darkMode}
              minDate={minDate}
              maxDate={maxDate} />

          {selectedDate && (
            <button
              onClick={handleGenerateForecast}
              className={`mt-6 px-5 py-2 font-semibold rounded-lg shadow-md transition duration-300 ${
                darkMode ? 'bg-[#981e32] text-white hover:bg-red-700' : 'bg-[#981e32] text-white hover:bg-red-800'
              }`}
            >
              Generate
            </button>
          )}
        </div>

        {isForecastReady && (
          <>
            <div className="mt-10 flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 ${darkMode ? 'bg-green-500 border-green-400' : 'bg-green-200 border-green-300'}`}></div>
                <span>Safe to spray</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 ${darkMode ? 'bg-yellow-500 border-yellow-400' : 'bg-yellow-200 border-yellow-300'}`}></div>
                <span>Spray with caution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 ${darkMode ? 'bg-red-600 border-red-400' : 'bg-red-200 border-red-300'}`}></div>
                <span>Do not spray</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-200 border-gray-300'}`}></div>
                <span>Unknown</span>
              </div>
            </div>

            <ForecastGrid sprayData={sprayData} darkMode={darkMode} getGuidanceColor={getGuidanceColor} getGuidanceText={getGuidanceText} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SprayGuidance;
