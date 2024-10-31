import React from 'react';
import NightlightIcon from '@mui/icons-material/NightlightOutlined';
import LightModeIcon from '@mui/icons-material/WbSunnyOutlined';

const Header = ({ darkMode, setDarkMode }) => (
  <header className={`${darkMode ? 'bg-[#981e32]' : 'bg-[#981e32]'} py-4`}>
    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src="/logo.jpg" alt="WSU Logo" className="h-10 w-auto" />
        <span className="text-white font-bold text-lg">WSU AgWeatherNet</span>
      </div>
      <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 rounded-lg transition duration-300">
        {darkMode ? <LightModeIcon /> : <NightlightIcon />}
      </button>
    </div>
  </header>
);

export default Header;
