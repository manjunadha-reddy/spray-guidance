import React from 'react';

const ForecastGrid = ({ sprayData, darkMode, getGuidanceColor, getGuidanceText }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
    {sprayData.map((hour, index) => (
      <div key={index} className={`p-5 rounded-xl shadow-lg border-2 transition transform hover:scale-105 ${getGuidanceColor(hour.guidance)}`}>
        <div className="text-center">
          <div className="text-sm font-semibold mb-1">{hour.hour}</div>
          <div className="text-sm">{hour.date}</div>
          <div className="text-sm mt-3 text-lg font-semibold">{getGuidanceText(hour.guidance)}</div>
        </div>
      </div>
    ))}
  </div>
);

export default ForecastGrid;
