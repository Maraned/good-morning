import React from 'react';

import Weather from 'comp/weather/Weather';
import { WeatherProvider } from 'context/Weather';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <WeatherProvider>
        <Weather />
      </WeatherProvider>
        Hello
    </div>
  );
}
