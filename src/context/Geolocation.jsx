import React, { useEffect, useReducer } from 'react';

const initialState = { lat: 0, lon: 0 };

export const GeolocationStateContext = React.createContext()
export const GeolocationDispatchContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { lat: action.value.lat, lon: action.value.lon };
    default:
      return state;
  }
}

export const GeolocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        const geoPos = {
          lat: startPos.coords.latitude,
          lon: startPos.coords.longitude
        };
        console.log('geopos', {
          lat: startPos.coords.latitude,
          lon: startPos.coords.longitude
        });

        dispatch({ type: 'update', value: geoPos });
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }

  useEffect(() => {
    fetchGeolocation();
  }, []);

  return (
    <GeolocationStateContext.Provider value={state}>
      <GeolocationDispatchContext.Provider value={dispatch}>
        {children}
      </GeolocationDispatchContext.Provider>
    </GeolocationStateContext.Provider>
  );
}
