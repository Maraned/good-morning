import './vars.css';
import './App.css';

import React from 'react';

import { GeolocationProvider } from 'context/Geolocation';
import Dashboard from 'comp/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <GeolocationProvider>
        <Dashboard />
      </GeolocationProvider>
    </div>
  );
}

export default App;
